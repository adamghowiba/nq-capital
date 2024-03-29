import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nq-capital/service-database';
import {
  CreateFundInput,
  CreateNestedInvestorFundWithoutFundInput,
} from './dto/create-fund.input';
import { UpdateFundInput } from './dto/update-fund.input';
import { FundEntity } from './entities/fund.entity';
import { AddFundInvestorsInput } from '../investor-funds/dto/update-fund-investors.input';

@Injectable()
export class FundsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFundInput: CreateFundInput) {
    const { initial_balance, ...rest } = createFundInput;

    const investmentCalculations = await this.calculateNewFundInvestorsStake({
      investors: createFundInput.investors,
      initialBalance: initial_balance,
    });

    const fund = await this.prisma.fund.create({
      data: {
        ...rest,
        balance: investmentCalculations.totalInvestment,
        investors: investmentCalculations?.investors
          ? {
              create: investmentCalculations.investors?.map((investor) => ({
                initial_investment: investor.initial_investment,
                investor_id: investor.investor_id,
                stake_percentage: investor.stage_percentage,
                invested_amount: investor.initial_investment,
              })),
            }
          : undefined,
      },
    });

    return fund;
  }

  /**
   * Calculate the new stake percentage of a group of new investors
   * when creating a fund
   */
  async calculateNewFundInvestorsStake(params: {
    investors: CreateFundInput['investors'];
    initialBalance?: number;
  }): Promise<{
    investors: (CreateNestedInvestorFundWithoutFundInput & {
      stage_percentage: number;
    })[];
    totalInvestment: number;
  }> {
    if (!params.investors)
      return {
        totalInvestment: 0,
        investors: [],
      };

    const totalInvestment = params.investors.reduce(
      (acc, investor) => acc + investor.initial_investment || 0,
      params.initialBalance || 0
    );

    const investors = params.investors.map((investor) => {
      const stakePercentage = investor.initial_investment / totalInvestment;

      return { ...investor, stage_percentage: stakePercentage };
    });

    return { investors: investors, totalInvestment };
  }

  async addInvestor(addFundInvestorInput: AddFundInvestorsInput) {
    // TODO: Needs to be transaction
    const fund = await this.prisma.fund.update({
      where: { id: addFundInvestorInput.id },
      data: {
        balance: {
          increment: addFundInvestorInput.initial_investment,
        },
        investors: {
          create: {
            stake_percentage: 0,
            investor_id: addFundInvestorInput.investor_id,
            initial_investment: addFundInvestorInput.initial_investment,
            invested_amount: addFundInvestorInput.initial_investment,
          },
        },
      },
    });

    const updatedFund = await this.recalculateInvestorStakes({ fundId: addFundInvestorInput.id });

    return updatedFund;
  }

  async recalculateInvestorStakes(params: { fundId: number }) {
    const fund = await this.prisma.fund.findUniqueOrThrow({
      where: { id: params.fundId },
      include: {
        investors: true,
      },
    });

    const fundBalance = fund.balance;

    const investors = fund.investors.map((investor) => {
      const stakePercentage = investor.invested_amount / fundBalance;

      return { ...investor, stake_percentage: stakePercentage };
    });

    const updatedFund = await this.prisma.fund.update({
      where: { id: params.fundId },
      data: {
        investors: {
          update: investors.map((investor) => ({
            where: { id: investor.id },
            data: {
              stake_percentage: investor.stake_percentage,
            },
          })),
        },
      },
    });

    return updatedFund
  }

  async list() {
    const fund = await this.prisma.fund.findMany({});

    return fund;
  }

  async retrieve(id: number): Promise<FundEntity> {
    const fund = await this.prisma.fund.findUniqueOrThrow({ where: { id } });

    return fund;
  }

  async retrieveByName(name: string) {
    const fund = await this.prisma.fund.findUnique({ where: { name } });

    return fund;
  }

  async update(id: number, updateFundInput: UpdateFundInput) {
    const fund = await this.prisma.fund.update({
      where: { id },
      data: { ...updateFundInput, investors: undefined },
    });

    return fund;
  }

  async remove(id: number) {
    const fund = await this.prisma.fund.delete({ where: { id } });

    return fund;
  }
}

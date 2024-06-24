import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nq-capital/service-database';
import { GraphQLError } from 'graphql';
import { AddInvestmentInput } from '../investor-funds/dto/update-fund-investors.input';
import { TransactionEmitter } from '../transactions/event-manager/transaction-emitter.service';
import { AdjustFundInput } from './dto/adjust-fund.input';
import {
  CreateFundInput,
  CreateNestedInvestorFundWithoutFundInput,
} from './dto/create-fund.input';
import { UpdateFundInput } from './dto/update-fund.input';
import { FundEntity } from './entities/fund.entity';
import { FundAdjustmentEntity } from './entities/fund-adjustment.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiError } from '../../common/exceptions/api.error';

@Injectable()
export class FundsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionsEmitter: TransactionEmitter
  ) {}

  async create(createFundInput: CreateFundInput) {
    const { initial_balance, ...rest } = createFundInput;

    const investmentCalculations = await this.calculateNewFundInvestorsStake({
      investors: createFundInput.investors,
      initialBalance: initial_balance,
    });

    try {
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
    } catch (error) {
      throw new ApiError('A fund with that name already exists', {
        explanation: `A fund with the name '${createFundInput.name}' already exists. Please choose a different name`,
        meta: {
          name: createFundInput.name,
          test: "SOme test"
        }
      });
    }
  }

  async adjustFund(adjustFundInput: AdjustFundInput) {
    if (adjustFundInput.amount === 0)
      throw new GraphQLError(
        'A fund adjustment must be a positive or negative value and cannot be 0'
      );

    const fund = await this.prisma.fund.update({
      where: { id: adjustFundInput.fund_id },
      data: {
        balance: {
          // The the amount is negative prisma will automatically subtract
          increment: adjustFundInput.amount,
        },
      },
    });

    const updatedFundInvestors = await this.recalculateFundInvestorsBalance({
      fundId: fund.id,
    });

    const fundAdjustment = await this.prisma.fundAdjustment.create({
      data: {
        amount: adjustFundInput.amount,
        fund_id: adjustFundInput.fund_id,
        adjusted_by_user_id: adjustFundInput.adjusted_by_user_id,
        description: adjustFundInput.description,
        balance_before: fund.balance - adjustFundInput.amount,
        balance_after: fund.balance,
      },
    });

    this.transactionsEmitter.emit('fund_adjustment', {
      adjusted_by_user_id: adjustFundInput.adjusted_by_user_id,
      amount: adjustFundInput.amount,
      fund_id: adjustFundInput.fund_id,
      description: adjustFundInput.description,
    });

    return fund;
  }

  async listFundAdjustments(): Promise<FundAdjustmentEntity[]> {
    const fundAdjustments = await this.prisma.fundAdjustment.findMany({
      orderBy: { created_at: 'desc' },
    });

    return fundAdjustments;
  }

  async addInvestment(addFundInvestorInput: AddInvestmentInput) {
    // TODO: Needs to be transaction
    const fund = await this.prisma.fund.update({
      where: { id: addFundInvestorInput.fund_id },
      data: {
        balance: {
          increment: addFundInvestorInput.amount,
        },
        investors: {
          upsert: {
            where: {
              investor_id_fund_id: {
                fund_id: addFundInvestorInput.fund_id,
                investor_id: addFundInvestorInput.investor_id,
              },
            },
            update: {
              balance: {
                increment: addFundInvestorInput.amount,
              },
              invested_amount: {
                increment: addFundInvestorInput.amount,
              },
            },
            create: {
              stake_percentage: 0,
              investor_id: addFundInvestorInput.investor_id,
              initial_investment: addFundInvestorInput.amount,
              invested_amount: addFundInvestorInput.amount,
              balance: addFundInvestorInput.amount,
            },
          },
        },
      },
    });

    const updatedFund = await this.recalculateInvestorStakes({
      fundId: addFundInvestorInput.fund_id,
    });

    this.transactionsEmitter.emit('new_investment', addFundInvestorInput);

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
      const stakePercentage = investor.balance / fundBalance;

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

    return updatedFund;
  }

  /**
   * Recalculate an investors balance for a particular fund.
   * @param params
   * @returns
   */
  async recalculateFundInvestorsBalance(params: { fundId: number }) {
    const fund = await this.prisma.fund.findUniqueOrThrow({
      where: {
        id: params.fundId,
      },
    });

    const fundInvestor = await this.prisma.investorFund.findMany({
      where: {
        fund_id: params.fundId,
      },
      include: {
        investor: true,
      },
    });

    const updatedFundInvestor = await this.prisma.$transaction(
      fundInvestor.map((investorFund) => {
        return this.prisma.investorFund.update({
          where: {
            id: investorFund.id,
          },
          data: {
            balance: fund.balance * investorFund.stake_percentage.toNumber(),
          },
        });
      })
    );

    return updatedFundInvestor;
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

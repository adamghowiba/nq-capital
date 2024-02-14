import { Injectable } from '@nestjs/common';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';
import { PrismaService } from '@nq-capital/service-database';
import { Decimal } from '@prisma/client/runtime/library';
import { InvestorFundEntity } from './entities/investor-fund.entity';
import { InvestorEntity } from './entities/investor.entity';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvestorInput: CreateInvestorInput) {
    const investor = await this.prisma.investor.create({
      data: {
        ...createInvestorInput,
        bank_accounts: createInvestorInput.bankAccountsCreateMany,
      },
    });

    return investor;
  }

  async list(): Promise<InvestorEntity[]> {
    const investors = await this.prisma.investor.findMany();

    return investors;
  }

  async listInvestorFunds(params: {
    investorId: number;
  }): Promise<InvestorFundEntity[]> {
    const investorFunds = await this.prisma.investorFund.findMany({
      where: { investor_id: params.investorId },
      include: { investor: true, fund: true },
    });

    const transformedInvestorFunds = investorFunds.map((investorFund) => {
      const fundBalance = new Decimal(investorFund.fund.balance);
      const stakePercentage = investorFund.stake_percentage;
      const investorBalanceInFund = fundBalance.times(stakePercentage);

      return {
        investor_balance_in_fund: investorBalanceInFund.toNumber(),
        ...investorFund,
        stake_percentage: investorFund.stake_percentage.toNumber(),
      };
    });

    return transformedInvestorFunds;
  }

  async listInvestorBankAccounts(params: { investorId: number }) {
    const bankAccounts = await this.prisma.investor
      .findUnique({ where: { id: params.investorId } })
      .bank_accounts();

    return bankAccounts;
  }

  async retrieve(id: number) {
    const investor = await this.prisma.investor.findUnique({ where: { id } });

    return investor;
  }

  async update(id: number, updateInvestorInput: UpdateInvestorInput) {
    const investor = await this.prisma.investor.update({
      where: { id },
      data: {
        ...updateInvestorInput,
      },
    });

    return investor;
  }

  async remove(id: number) {
    const investor = await this.prisma.investor.delete({ where: { id } });

    return investor;
  }
}

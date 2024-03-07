import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nq-capital/service-database';
import { InvestorFundEntity } from './entities/investor-fund.entity';
import { Decimal } from '@prisma/client/runtime/library';
import { ListInvestorFundArgs } from './dto/get-investor-fund.args';

@Injectable()
export class InvestorFundsService {
  constructor(private readonly prisma: PrismaService) {}

  async listInvestorFunds(
    params: ListInvestorFundArgs
  ): Promise<InvestorFundEntity[]> {
    const investorFunds = await this.prisma.investorFund.findMany({
      where: { investor_id: params?.investorId, fund_id: params?.fundId },
      include: { investor: true, fund: true },
      ...params.offset,
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

  async retrieveInvestorFund(params: {
    investorFundId: number;
  }): Promise<InvestorFundEntity> {
    const investorFund = await this.prisma.investorFund.findUniqueOrThrow({
      where: { id: params.investorFundId },
      include: { investor: true, fund: true },
    });

    const fundBalance = new Decimal(investorFund.fund.balance);
    const stakePercentage = investorFund.stake_percentage;
    const investorBalanceInFund = fundBalance.times(stakePercentage);

    return {
      investor_balance_in_fund: investorBalanceInFund.toNumber(),
      ...investorFund,
      stake_percentage: investorFund.stake_percentage.toNumber(),
    };
  }
}

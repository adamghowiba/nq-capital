import { PrismaService } from '@nq-capital/service-database';
import { GetFundOverViewArgs } from './dto/get-fund-overview.args';
import { FundOverviewEntity } from './entities/fund-overview.entity';
import { FundInvestorOverview } from './entities/fund-investor-overview.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FundAggregatorService {
  constructor(private prisma: PrismaService) {}

  async getOverview(params: GetFundOverViewArgs): Promise<FundOverviewEntity> {
    const funds = await this.prisma.fund.findMany({
      where: { id: params.fund_ids ? { in: params.fund_ids } : undefined },
      include: {
        investors: {
          select: {
            invested_amount: true,
          },
        },
      },
    });

    const data = funds.reduce(
      (
        acc: Pick<FundOverviewEntity, 'current_amount' | 'invested_amount'>,
        fund
      ) => {
        acc.current_amount += fund.balance;
        acc.invested_amount += fund.investors.reduce(
          (acc, investor) => acc + investor.invested_amount,
          0
        );

        return acc;
      },
      { current_amount: 0, invested_amount: 0 }
    );

    return {
      invested_amount: data.invested_amount,
      current_amount: data.current_amount,
      net_returns: data.current_amount - data.invested_amount,
    };
  }

  async getInvestorsOverview(params: GetFundOverViewArgs): Promise<FundInvestorOverview[]> {
    const fundInvestor = await this.prisma.investorFund.findMany({
      where: {
        fund_id: params.fund_ids ? { in: params.fund_ids } : undefined,
      },
      include: {
        investor: true,
      },
    });

    const investorOverview = fundInvestor.reduce(
      (acc: Map<number, FundInvestorOverview>, fund) => {
        const investorId = fund.investor_id;
        const currentAcc = acc.get(investorId);

        if (!currentAcc) {
          acc.set(investorId, {
            current_balance: fund.balance,
            invested_amount: fund.invested_amount,
            email: fund.investor.email,
            first_name: fund.investor.first_name,
            investor_id: fund.investor_id,
            last_name: fund.investor.last_name,
          });
        }

        if (currentAcc) {
          currentAcc.current_balance += fund.balance;
          currentAcc.invested_amount += fund.invested_amount;
        }

        return acc;
      },
      new Map<number, FundInvestorOverview>()
    );

    return Array.from(investorOverview.values())
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nq-capital/service-database';
import { Transaction } from '@prisma/client';
import { DateTime } from 'luxon';
import {
  GetFundOverViewArgs,
  GetFundOverviewHistoryArgs,
  Timespan,
} from './dto/get-fund-overview.args';
import { FundInvestorOverview } from './entities/fund-investor-overview.entity';
import {
  FundOverviewEntity,
  FundOverviewHistoryEntity,
  FundOverviewHistoryItem,
} from './entities/fund-overview.entity';
import { getFundAdjustmentsAsTransactions } from './helpers/fund-adjustment.helpers';

@Injectable()
export class FundAggregatorService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get an aggregated overview of one or many funds.
   * e.g total invested amount, current amount, net returns
   */
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

  async getInvestorsOverview(
    params: GetFundOverViewArgs
  ): Promise<FundInvestorOverview[]> {
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

    return Array.from(investorOverview.values());
  }

  async getOverviewHistory(
    params: GetFundOverviewHistoryArgs
  ): Promise<FundOverviewHistoryEntity> {
    const timespan = params.timespan;
    const now = DateTime.utc();

    const transactions: Transaction[] = await this.prisma.transaction.findMany({
      where: {
        fund_id: params.fund_ids ? { in: params.fund_ids } : undefined,
        status: 'COMPLETED',
        type: { in: ['DEPOSIT', 'WITHDRAWAL'] },
        created_at: {
          gte: now.minus({ year: 1 }).startOf('month').toJSDate(),
        },
      },
    });

    const fundAdjustments = await this.prisma.fundAdjustment.findMany({
      where: {
        created_at: {
          gte: now.minus({ year: 1 }).startOf('month').toJSDate(),
        },
      },
    });

    const timespanDates = this.getTimespanDates({ timespan: params.timespan });

    if (!transactions.length) {
      return {
        timespan,
        data: [],
      };
    }

    const transactionsWithAdjustments: Transaction[] = [
      ...transactions,
      ...getFundAdjustmentsAsTransactions(fundAdjustments),
    ];

    const aggregatedTransactions = transactionsWithAdjustments
      .reduce(
        (acc: FundOverviewHistoryItem[], transaction) => {
          const transactionDate = DateTime.fromJSDate(transaction.created_at);

          const timespanIndex = timespanDates.findIndex((timespanDate) => {
            if (params.timespan === 'year') {
              return transactionDate.hasSame(timespanDate, 'month');
            }

            return transactionDate.hasSame(timespanDate, 'day');
          });

          if (timespanIndex === -1) {
            return acc;
          }

          acc[timespanIndex] = {
            ...acc[timespanIndex],
            amount: Math.round(acc[timespanIndex].amount + transaction.amount),
          };

          return acc;
        },
        timespanDates.map((date) => ({ date: date.toMillis(), amount: 0 }))
      )
      .map((period, index, allPeriods) => {
        // Carry forward the balance to the next period
        period.amount =
          (period?.amount || 0) + allPeriods[index - 1]?.amount || 0;

        return period;
      });

    return {
      timespan: timespan,
      data: aggregatedTransactions,
    };
  }

  /**
   * Get a list of dates for the given timespan
   * @param params
   */
  getTimespanDates(params?: { timespan?: Timespan }) {
    const now = DateTime.now();
    const timespan: Timespan = params?.timespan ?? 'year';

    if (timespan === 'year') {
      const start = now.endOf('month').minus({ year: 1 });

      return Array.from({ length: 13 }, (_, i) => start.plus({ month: i }));
    }

    const start = now.minus({ month: 1 });

    return Array.from({ length: now.daysInMonth }, (_, i) =>
      start.plus({ day: i })
    );
  }
}

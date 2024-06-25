import { DateTime } from 'luxon';
import { useListTransactionsQuery } from '../../gql/gql-client';
import { useMemo } from 'react';

export type Timespan = 'year' | 'month';

const now = DateTime.now();

/**
 * Get a list of dates for the given timespan
 * @param params
 */
export const getTimespanDates = (params?: { timespan?: Timespan }) => {
  const timespan = params?.timespan ?? 'month';

  if (timespan === 'year') {
    const start = now.endOf('month').minus({ year: 1 });

    return Array.from({ length: 13 }, (_, i) => start.plus({ month: i }));
  }

  const start = now.endOf("day").minus({ month: 1 });
  const diff = Math.ceil(Math.abs(start.diffNow('days').days))

  return Array.from({ length: diff + 1}, (_, i) =>
    start.plus({ day: i }).endOf("day")
  );
};

export const usePortfolioPerformance = (params: { timespan: Timespan }) => {
  const transactions = useListTransactionsQuery(
    {},
    { select: (data) => data.transactions }
  );

  const timespanDates = useMemo(() => {
    return getTimespanDates({ timespan: params.timespan });
  }, [params.timespan]);

  const aggregatedTransactions = useMemo(() => {
    if (!transactions.data) {
      return [];
    }

    return transactions.data
      .reduce(
        (acc, transaction) => {
          const transactionDate = DateTime.fromISO(transaction.created_at);

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
  }, [transactions.data, timespanDates]);

  return {
    transactions,
    timespanDates,
    aggregatedTransactions,
  };
};

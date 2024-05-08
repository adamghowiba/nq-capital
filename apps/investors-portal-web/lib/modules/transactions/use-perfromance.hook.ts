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
    const start = now.minus({ year: 1 });

    return Array.from({ length: 12 }, (_, i) => start.plus({ month: i }));
  }

  const start = now.minus({ month: 1 });

  return Array.from({ length: now.daysInMonth }, (_, i) =>
    start.plus({ day: i })
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

    return transactions.data.reduce(
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
          amount: acc[timespanIndex].amount + transaction.amount,
        };

        return acc;
      },
      timespanDates.map((date) => ({ date: date.toMillis(), amount: 0 }))
    );
  }, [transactions.data, timespanDates]);

  return {
    transactions,
    timespanDates,
    aggregatedTransactions,
  };
};

import { FundAdjustment, Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

/**
 * Get fund adjustments as a transaction. Useful when you want
 * to aggregate transactions and adjustments into a single list.
 */
export const getFundAdjustmentsAsTransactions = (
  adjustments: FundAdjustment[]
) => {
  const adjustmentsAsTransactions: Transaction[] = adjustments.map(
    (adjustment) => {
      return {
        id: adjustment.id,
        amount: adjustment.amount,
        balance_after: adjustment.balance_after,
        created_at: adjustment.created_at,
        fund_id: adjustment.fund_id,
        updated_at: adjustment.updated_at,
        currency_code: 'USD',
        status: 'COMPLETED',
        type: adjustment.amount > 0 ? 'DEPOSIT' : 'WITHDRAWAL',
        description: null,
        external_id: null,
        fee: new Decimal(0),
        investor_id: null,
        meta: null,
        notes: null,
      };
    }
  );

  return adjustmentsAsTransactions;
};

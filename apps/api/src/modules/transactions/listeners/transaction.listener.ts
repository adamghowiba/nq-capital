import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@nq-capital/service-database';
import { TRANSACTION_EVENTS } from '../event-manager/transaction-emitter.service';
import { InvestmentEvent } from '../events/investment.event';
import { InvestorsService } from '../../investors/investors.service';
import { InvestorPortfolioEntity } from '../../investors/entities/investor-portfilo.entity';

@Injectable()
export class TransactionListener {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @OnEvent(TRANSACTION_EVENTS.new_investment)
  async handleInvestmentAdded(payload: InvestmentEvent) {
    const investor = await this.getInvestorBalance(payload.investor_id)

    const transaction = await this.prisma.transaction.create({
      data: {
        amount: payload.amount,
        balance_after: investor.total_balance + payload.amount,
        type: 'DEPOSIT',
        currency_code: 'USD',
        description: 'Investment deposit',
        status: 'COMPLETED',
        investor_id: payload.investor_id,
      },
    });

    return transaction;
  }

  private async getInvestorBalance(investorId: number) {
    const investor = await this.prisma.investorFund.findMany({
      where: { investor_id: investorId },
    });

    const totals = investor.reduce(
      (
        acc: Pick<InvestorPortfolioEntity, 'total_balance' | 'total_invested'>,
        curr
      ) => {
        // TODO!: May need to use Decimal library from prisma
        acc.total_invested += curr.invested_amount;

        acc.total_balance += curr.balance;
        return acc;
      },
      { total_invested: 0, total_balance: 0 }
    );

    return {
      total_balance: totals.total_balance,
      total_invested: totals.total_invested,
      total_pending_transactions: 0,
    };
  }
}

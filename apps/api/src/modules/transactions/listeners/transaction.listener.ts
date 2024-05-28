import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@nq-capital/service-database';
import { InvestorPortfolioEntity } from '../../investors/entities/investor-portfilo.entity';
import { TRANSACTION_EVENTS } from '../event-manager/transaction-emitter.service';
import { InvestmentEvent } from '../events/investment.event';
import { FundAdjustmentEvent } from '../events/fund-adjustment.event';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionListener {
  constructor(private readonly prisma: PrismaService) {}

  @OnEvent(TRANSACTION_EVENTS.new_investment)
  async handleInvestmentAdded(payload: InvestmentEvent) {
    const investor = await this.getInvestorBalance(payload.investor_id);

    const transaction = await this.prisma.transaction.create({
      data: {
        amount: payload.amount,
        balance_after: investor.total_balance,
        type: 'DEPOSIT',
        currency_code: 'USD',
        status: 'COMPLETED',
        description: 'Investment deposit',
        notes: payload.notes,
        investor_id: payload.investor_id,
        fund_id: payload.fund_id,
        external_id: payload.reference_id,
      },
    });

    return transaction;
  }

  @OnEvent(TRANSACTION_EVENTS.fund_adjustment)
  async handleFundAdjustment(payload: FundAdjustmentEvent) {
    const investorFunds = await this.prisma.investorFund.findMany({
      where: {
        fund_id: payload.fund_id,
      },
      include: {
        investor: true,
      },
    });

    const transactions = investorFunds.map(
      (investorFund): Prisma.TransactionCreateManyInput => {
        const transactionAmount =
          payload.amount * investorFund.stake_percentage.toNumber();

        return {
          amount: transactionAmount,
          balance_after: investorFund.balance + payload.amount,
          type: 'ADJUSTMENT',
          currency_code: 'USD',
          status: 'COMPLETED',
          description: payload.description || 'Fund adjustment',
          investor_id: investorFund.investor_id,
          fund_id: payload.fund_id,
        };
      }
    );

    await this.prisma.transaction.createMany({
      data: transactions,
    });
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

import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@nq-capital/service-database';
import { Prisma } from '@prisma/client';
import { InvestorsService } from '../../investors/investors.service';
import { TRANSACTION_EVENTS } from '../event-manager/transaction-emitter.service';
import { FundAdjustmentEvent } from '../events/fund-adjustment.event';
import { InvestmentEvent } from '../events/investment.event';

/**
 * Transaction listener is in charge of listening to events that require
 * a transaction to be created
 */
@Injectable()
export class TransactionListener {
  constructor(
    private readonly prisma: PrismaService,
    private readonly investorService: InvestorsService
  ) {}

  @OnEvent(TRANSACTION_EVENTS.new_investment)
  async handleInvestmentAdded(payload: InvestmentEvent) {
    const investor = await this.investorService.getBalance(payload.investor_id);

    const transaction = await this.prisma.transaction.create({
      data: {
        amount: payload.amount,
        balance_after: investor.total_balance + payload.amount,
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
          balance_after: investorFund.balance,
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
}

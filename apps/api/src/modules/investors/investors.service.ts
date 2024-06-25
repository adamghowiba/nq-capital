import { Injectable } from '@nestjs/common';
import { InvestorEntity } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { Transaction } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { ApiError } from '../../common/exceptions/api.error';
import { TransactionEntity } from '../transactions/entities/transaction.entity';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';
import { WithdrawalInput } from './dto/withdrawal.input';
import {
  InvestorPortfolioEntity,
  PortfolioTotalEntity,
} from './entities/investor-portfilo.entity';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createInvestorInput: CreateInvestorInput
  ): Promise<InvestorEntity> {
    const hashedPassword = createInvestorInput.password
      ? hashSync(createInvestorInput.password, 10)
      : undefined;

    const investor = await this.prisma.investor.create({
      data: {
        ...createInvestorInput,
        bank_accounts: createInvestorInput.bankAccountsCreateMany,
        password: hashedPassword,
      },
    });

    return investor;
  }

  async list(): Promise<InvestorEntity[]> {
    const investors = await this.prisma.investor.findMany({
      where: {},
    });

    return investors;
  }

  async retrieve(id: number): Promise<InvestorEntity> {
    const investor = await this.prisma.investor.findUniqueOrThrow({
      where: { id },
    });

    // if (params?.ability === null) return investor;

    // const hasPermission = params?.ability?.can(
    //   'read',
    //   subject('Investor', investor)
    // );

    // if (hasPermission === false) {
    //   throw new ApiError("You don't have permission to view this user", {
    //     statusCode: 403,
    //   });
    // }

    return investor;
  }

  private getTransactionTotal(transactions: Transaction[]) {
    const totals = transactions.reduce(
      (
        acc: Pick<
          InvestorPortfolioEntity,
          'total_balance' | 'total_invested' | 'total_pending_transactions'
        >,
        curr
      ) => {
        // TODO!: May need to use Decimal library from prisma
        if (curr.type === 'DEPOSIT' || curr.type === 'WITHDRAWAL') {
          acc.total_invested += curr.amount;
        }

        if (curr.status === 'PENDING') {
          acc.total_pending_transactions = curr.amount;
        }

        acc.total_balance += curr.amount;
        return acc;
      },
      { total_invested: 0, total_balance: 0, total_pending_transactions: 0 }
    );

    return totals;
  }

  /**
   * Get an investors aggregated portfolio value across different funds
   * Achieves this through searching for all transactions made by the investor.
   *
   * **The main issue with this approach is it assumes there will be a transaction for the user
   * when a fund adjustment happens**
   * @returns
   */
  async getInvestorPortfolio(id: number): Promise<InvestorPortfolioEntity> {
    const transactions = await this.prisma.transaction.findMany({
      where: { investor_id: id },
    });

    const previousMonthTransactions = transactions.filter((transaction) => {
      const today = new Date();
      const monthAgo = new Date(today);
      monthAgo.setMonth(today.getMonth() - 1);

      return transaction.created_at > monthAgo;
    });

    const previousMonthTotals = this.getTransactionTotal(
      previousMonthTransactions
    );
    const overallTotals = this.getTransactionTotal(transactions);

    const balanceChangePercentage =
      (overallTotals.total_balance - previousMonthTotals.total_balance) /
      previousMonthTotals.total_balance;

    const balanceChangeAmount =
      overallTotals.total_balance - previousMonthTotals.total_balance;

    return {
      total_balance: overallTotals.total_balance,
      total_invested: overallTotals.total_invested,
      total_pending_transactions: overallTotals.total_pending_transactions,
      balance_change_percentage: balanceChangePercentage,
      balance_change_amount: balanceChangeAmount,
      previous_month: previousMonthTotals,
    };
  }

  /**
   * Get an investors total balance.
   * @TODO as data get's larger this will be inefficient
   * @param id Investor Id
   * @returns Aggregated balance
   */
  async getBalance(id: number): Promise<PortfolioTotalEntity> {
    const transactions = await this.prisma.transaction.findMany({
      where: { investor_id: id },
    });

    const overallTotals = this.getTransactionTotal(transactions);

    return {
      total_balance: overallTotals.total_balance,
      total_invested: overallTotals.total_invested,
      total_pending_transactions: overallTotals.total_pending_transactions,
    };
  }

  /**
   * Get investor portfolio by taking the current value of a portfolio by there stake in the portfolio
   */
  async getInvestorPortfolioWithStake(
    investorId: number
  ): Promise<InvestorPortfolioEntity> {
    const investorFunds = await this.prisma.investorFund.findMany({
      where: { investor_id: investorId },
    });

    const totalInvested = investorFunds.reduce(
      (acc, curr) => acc + curr.invested_amount,
      0
    );
    const totalBalance = investorFunds.reduce(
      (acc, curr) => acc + curr.balance,
      0
    );

    return {
      total_invested: totalInvested,
      balance_change_amount: 0,
      balance_change_percentage: 0,
      total_balance: totalBalance,
      total_pending_transactions: 0,
      previous_month: {
        total_balance: 0,
        total_invested: 0,
        total_pending_transactions: 0,
      },
    };
  }

  async update(
    id: number,
    updateInvestorInput: UpdateInvestorInput
  ): Promise<InvestorEntity> {
    const hashedPassword = updateInvestorInput.password
      ? hashSync(updateInvestorInput.password, 10)
      : undefined;

    const investor = await this.prisma.investor.update({
      where: { id },
      data: {
        ...updateInvestorInput,
        password: hashedPassword,
      },
    });

    return investor;
  }

  async withdrawal(
    withdrawalInput: WithdrawalInput
  ): Promise<TransactionEntity> {
    // TODO: Switch to using transaction emitter, and switch transaction emitter to use new AWS Command like system
    throw new ApiError('Withdrawals are currently disabled', {
      showMessageToUser: true,
    });

    const portfolio = await this.getInvestorPortfolio(
      withdrawalInput.investor_id
    );

    if (portfolio.total_balance < withdrawalInput.amount) {
      throw new ApiError('Insufficient funds', {
        explanation: "You don't have enough funds to withdraw that amount",
      });
    }

    const withdrawalTransaction = await this.prisma.transaction.create({
      data: {
        balance_after: portfolio.total_balance - withdrawalInput.amount,
        amount: withdrawalInput.amount,
        investor_id: withdrawalInput.investor_id,
        status: 'COMPLETED',
        type: 'WITHDRAWAL',
      },
    });

    const request = await this.prisma.request.create({
      data: {
        status: 'COMPLETED',
        investor_id: withdrawalInput.investor_id,
        withdrawal_requests: {
          create: {
            amount: withdrawalInput.amount,
            bank_account_id: withdrawalInput.bank_account_id,
          },
        },
      },
    });

    return withdrawalTransaction;
  }

  async remove(id: number): Promise<InvestorEntity> {
    const investor = await this.prisma.investor.delete({ where: { id } });

    return investor;
  }

  async getInvestorBankAccountsField(params: { investorId: number }) {
    const bankAccounts = await this.prisma.investor
      .findUnique({ where: { id: params.investorId } })
      .bank_accounts();

    return bankAccounts;
  }
}

import { subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';
import { InvestorPortfolioEntity } from './entities/investor-portfilo.entity';
import { InvestorEntity } from './entities/investor.entity';
import { Investor, Transaction } from '@prisma/client';
import { ApiError } from '../../common/exceptions/api.error';
import { accessibleBy } from '@casl/prisma';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvestorInput: CreateInvestorInput) {
    const investor = await this.prisma.investor.create({
      data: {
        ...createInvestorInput,
        bank_accounts: createInvestorInput.bankAccountsCreateMany,
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

  async retrieve(id: number) {
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

  async getTransactionTotal(transactions: Transaction[]) {
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

    const previousMonthTotals = await this.getTransactionTotal(
      previousMonthTransactions
    );
    const overallTotals = await this.getTransactionTotal(transactions);

    const balanceChangePercentage =
      (overallTotals.total_balance - previousMonthTotals.total_balance) /
      previousMonthTotals.total_balance;

    const balanceChangeAmount = overallTotals.total_balance - previousMonthTotals.total_balance;

    return {
      total_balance: overallTotals.total_balance,
      total_invested: overallTotals.total_invested,
      total_pending_transactions: overallTotals.total_pending_transactions,
      balance_change_percentage: balanceChangePercentage,
      balance_change_amount: balanceChangeAmount,
      previous_month: previousMonthTotals,
    };
  }

  async update(id: number, updateInvestorInput: UpdateInvestorInput) {
    const investor = await this.prisma.investor.update({
      where: { id },
      data: {
        ...updateInvestorInput,
      },
    });

    return investor;
  }

  async remove(id: number) {
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

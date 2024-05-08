import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { PrismaService } from '@nq-capital/service-database';
import { GraphQLError } from 'graphql';
import { TransactionEntity } from './entities/transaction.entity';
import { AppAbility } from '@nq-capital/iam';
import { accessibleBy } from '@casl/prisma';

/**
 * Events that trigger a transaction:
 * - Investors invests in a fund
 * - Investor withdraws from a fund
 *
 * Maybe Events:
 * - Admin increases fund value
 *
 *
 * History:
 * Fund A: $100
 *
 * Investor A invests $50
 * Investor B invests $50
 * Both investor A & B own 50% of the fund
 *
//  * Fund goes up by $100 totaling $200.
//  * Each investor has $100 in there portfolio.
 *
 * Investor C invests $100 totaling 100% of the fund.
 * Investor A & B have a new ownership of 25%.
 *
 * Current fund amount: $300
 * Investor C balance (50% stake): $150
 * Investor A & B balance (25% stake): $75
 */

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTransactionInput: CreateTransactionInput
  ): Promise<TransactionEntity> {
    const transaction = await this.prisma.transaction.create({
      data: createTransactionInput,
    });

    return transaction;
  }

  async list(params: { ability: AppAbility }): Promise<TransactionEntity[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        AND: [accessibleBy(params.ability).Transaction],
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return transactions;
  }

  async retrieve(id: number): Promise<TransactionEntity> {
    const transactions = await this.prisma.transaction.findUniqueOrThrow({
      where: { id },
    });

    return transactions;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    throw new GraphQLError('Unimplemented');
  }

  /**
   * TODO
   * - Soft delete
   */
  remove(id: number) {
    throw new GraphQLError('Unimplemented');
  }
}

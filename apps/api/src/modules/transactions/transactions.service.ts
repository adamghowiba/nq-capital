import { Injectable } from '@nestjs/common';
import { ApplicationSessionEntity } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { GraphQLError } from 'graphql';
import { ApiError } from '../../common/exceptions/api.error';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { ListTransactionsArgs } from './dto/get-transaction.args';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionEntity } from './entities/transaction.entity';

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

  async list(
    params: ListTransactionsArgs,
    session: ApplicationSessionEntity
  ): Promise<TransactionEntity[]> {
    if (session.user_type === 'INVESTOR' && !session.investor?.id)
      throw new ApiError('Insufficient permissions');

    const transactions = await this.prisma.transaction.findMany({
      where: {
        investor_id:
          session.user_type === 'INVESTOR'
            ? session.investor?.id
            : params.investorId || undefined,
        fund_id: params.fundId || undefined,
        status: params.status ? { in: params.status } : undefined,
        type: params.type ? { in: params.type } : undefined,
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

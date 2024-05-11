import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from '@nq-capital/iam';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Resolver(() => TransactionEntity)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => TransactionEntity)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput
  ) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Permission('read', 'Transaction')
  @Query(() => [TransactionEntity], { name: 'transactions' })
  findAll() {
    return this.transactionsService.list();
  }

  @Query(() => TransactionEntity, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.retrieve(id);
  }

  @Mutation(() => TransactionEntity)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput
  ) {
    return this.transactionsService.update(
      updateTransactionInput.id,
      updateTransactionInput
    );
  }

  @Mutation(() => TransactionEntity)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.remove(id);
  }
}

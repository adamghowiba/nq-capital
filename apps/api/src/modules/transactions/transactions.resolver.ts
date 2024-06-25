import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ApplicationSessionEntity, InvestorEntity, Permission, SessionEntity } from '@nq-capital/iam';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '@nq-capital/service-database';
import { FundEntity } from '../funds/entities/fund.entity';
import { GqlSession } from '../../common/decorators/auth/session.decorator';
import { ListTransactionsArgs } from './dto/get-transaction.args';

@Resolver(() => TransactionEntity)
export class TransactionsResolver {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly prisma: PrismaService
  ) {}

  @Mutation(() => TransactionEntity)
  createTransaction(
    @Args('createTransactionInput')
    createTransactionInput: CreateTransactionInput
  ) {
    return this.transactionsService.create(createTransactionInput);
  }

  @Permission('read', 'Transaction')
  @Query(() => [TransactionEntity], { name: 'transactions' })
  list(@Args() listTransactionArgs: ListTransactionsArgs, @GqlSession() session: ApplicationSessionEntity) {
    return this.transactionsService.list(listTransactionArgs, session);
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

  @ResolveField(() => InvestorEntity, { name: 'investor', nullable: true })
  getInvestorField(@Parent() transaction: TransactionEntity) {
    return this.prisma.transaction
      .findUnique({ where: { id: transaction.id } })
      .investor();
  }

  @ResolveField(() => FundEntity, { name: 'fund', nullable: true })
  getFundField(@Parent() transaction: TransactionEntity) {
    return this.prisma.transaction
      .findUnique({ where: { id: transaction.id } })
      .fund();
  }
}

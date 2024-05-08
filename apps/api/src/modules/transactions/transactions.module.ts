import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionEmitter } from './event-manager/transaction-emitter.service';
import { TransactionListener } from './listeners/transaction.listener';
import { InvestorsModule } from '../investors/investors.module';

@Module({
  providers: [
    TransactionsResolver,
    TransactionsService,
    TransactionEmitter,
    TransactionListener,
  ],
  exports: [TransactionEmitter],
})
export class TransactionsModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionEmitter } from './event-manager/transaction-emitter.service';
import { TransactionListener } from './listeners/transaction.listener';
import { InvestorsModule } from '../investors/investors.module';
import { InvestorsService } from '../investors/investors.service';

@Module({
  // imports: [forwardRef(() => InvestorsModule)],
  providers: [
    TransactionsResolver,
    TransactionsService,
    TransactionEmitter,
    TransactionListener,
    InvestorsService
  ],
  exports: [TransactionEmitter],
})
export class TransactionsModule {}

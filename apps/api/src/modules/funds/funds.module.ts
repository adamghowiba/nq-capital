import { Module } from '@nestjs/common';
import { FundsResolver } from './funds.resolver';
import { FundsService } from './funds.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [TransactionsModule],
  providers: [FundsResolver, FundsService],
  exports: [FundsService],
})
export class FundsModule {}

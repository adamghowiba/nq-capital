import { Module } from '@nestjs/common';
import { FundsResolver } from './funds.resolver';
import { FundsService } from './funds.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { FundAggregatorService } from './fund-aggregator.service';

@Module({
  imports: [TransactionsModule],
  providers: [FundsResolver, FundsService, FundAggregatorService],
  exports: [FundsService],
})
export class FundsModule {}

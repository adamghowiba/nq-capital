import { Module } from '@nestjs/common';
import { FundsResolver } from './funds.resolver';
import { FundsService } from './funds.service';

@Module({
  providers: [FundsResolver, FundsService],
  exports: [FundsService],
})
export class FundsModule {}

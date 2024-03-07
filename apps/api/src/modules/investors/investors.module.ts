import { Module } from '@nestjs/common';
import { FundsModule } from '../funds/funds.module';
import { InvestorsResolver } from './investors.resolver';
import { InvestorsService } from './investors.service';

@Module({
  imports: [FundsModule],
  providers: [InvestorsResolver, InvestorsService],
  exports: [InvestorsService],
})
export class InvestorsModule {}

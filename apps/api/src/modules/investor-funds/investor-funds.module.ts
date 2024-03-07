import { Module } from '@nestjs/common';
import { InvestorFundsService } from './investor-funds.service';
import { InvestorFundsResolver } from './investor-funds.resolver';

@Module({
  providers: [InvestorFundsResolver, InvestorFundsService],
})
export class InvestorFundsModule {}

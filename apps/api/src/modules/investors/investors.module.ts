import { Module } from '@nestjs/common';
import { InvestorsService } from './investors.service';
import { InvestorsResolver } from './investors.resolver';

@Module({
  providers: [InvestorsResolver, InvestorsService],
})
export class InvestorsModule {}

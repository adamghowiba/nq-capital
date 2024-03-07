import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { InvestorFundEntity, PaginatedInvestorFundEntity } from './entities/investor-fund.entity';
import { InvestorFundsService } from './investor-funds.service';
import { ListInvestorFundArgs } from './dto/get-investor-fund.args';
import { UseInterceptors } from '@nestjs/common';
import { PaginationInterceptor } from '../../common/interceptors/pagination.interceptor';

@Resolver(() => InvestorFundEntity)
export class InvestorFundsResolver {
  constructor(private readonly investorFundsService: InvestorFundsService) {}

  @UseInterceptors(PaginationInterceptor)
  @Query(() => PaginatedInvestorFundEntity, { name: 'investorFunds' })
  listInvestorFunds(@Args() listInvestorFundArgs: ListInvestorFundArgs) {
    return this.investorFundsService.listInvestorFunds(listInvestorFundArgs);
  }

  @Query(() => [InvestorFundEntity], { name: 'investorFund' })
  retrieve(@Args('id', { type: () => Int }) investorFundId: number) {
    return this.investorFundsService.retrieveInvestorFund({ investorFundId });
  }
}

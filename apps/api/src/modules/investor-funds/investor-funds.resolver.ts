import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvestorFundsService } from './investor-funds.service';
import { InvestorFund } from './entities/investor-fund.entity';
import { CreateInvestorFundInput } from './dto/create-investor-fund.input';
import { UpdateInvestorFundInput } from './dto/update-investor-fund.input';

@Resolver(() => InvestorFund)
export class InvestorFundsResolver {
  constructor(private readonly investorFundsService: InvestorFundsService) {}

  @Mutation(() => InvestorFund)
  createInvestorFund(
    @Args('createInvestorFundInput')
    createInvestorFundInput: CreateInvestorFundInput
  ) {
    return this.investorFundsService.create(createInvestorFundInput);
  }

  @Query(() => [InvestorFund], { name: 'investorFunds' })
  findAll() {
    return this.investorFundsService.findAll();
  }

  @Query(() => InvestorFund, { name: 'investorFund' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.investorFundsService.findOne(id);
  }

  @Mutation(() => InvestorFund)
  updateInvestorFund(
    @Args('updateInvestorFundInput')
    updateInvestorFundInput: UpdateInvestorFundInput
  ) {
    return this.investorFundsService.update(
      updateInvestorFundInput.id,
      updateInvestorFundInput
    );
  }

  @Mutation(() => InvestorFund)
  removeInvestorFund(@Args('id', { type: () => Int }) id: number) {
    return this.investorFundsService.remove(id);
  }
}

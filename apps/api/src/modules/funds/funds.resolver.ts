import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InvestorEntity } from '../investors/entities/investor.entity';
import { CreateFundInput } from './dto/create-fund.input';
import { UpdateFundInput } from './dto/update-fund.input';
import { FundEntity } from './entities/fund.entity';
import { FundsService } from './funds.service';
import { AddInvestmentInput } from '../investor-funds/dto/update-fund-investors.input';
import { AdjustFundInput } from './dto/adjust-fund.input';
import { FundOverviewEntity } from './entities/fund-overview.entity';
import { GetFundOverViewArgs } from './dto/get-fund-overview.args';
import { FundAggregatorService } from './fund-aggregator.service';
import { FundInvestorOverview } from './entities/fund-investor-overview.entity';

@Resolver(() => FundEntity)
export class FundsResolver {
  constructor(
    private readonly fundsService: FundsService,
    private readonly fundAggregatorService: FundAggregatorService
  ) {}

  @Mutation(() => FundEntity)
  createFund(@Args('createFundInput') createFundInput: CreateFundInput) {
    return this.fundsService.create(createFundInput);
  }

  @Mutation(() => FundEntity)
  addInvestment(
    @Args('addInvestmentInput') addInvestmentInput: AddInvestmentInput
  ) {
    return this.fundsService.addInvestment(addInvestmentInput);
  }

  @Query(() => [FundEntity], { name: 'funds' })
  list() {
    return this.fundsService.list();
  }

  @Query(() => [FundOverviewEntity], { name: 'fundOverview' })
  fundOverview(@Args() fundOverviewArgs: GetFundOverViewArgs) {
    return this.fundAggregatorService.getOverview(fundOverviewArgs);
  }

  @Query(() => [FundInvestorOverview], { name: 'fundInvestorsOverview' })
  fundInvestorsOverview(@Args() fundOverviewArgs: GetFundOverViewArgs) {
    return this.fundAggregatorService.getInvestorsOverview(fundOverviewArgs);
  }

  @Query(() => FundEntity, { name: 'fund' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.fundsService.retrieve(id);
  }

  @Mutation(() => FundEntity)
  updateFund(@Args('updateFundInput') updateFundInput: UpdateFundInput) {
    return this.fundsService.update(updateFundInput.id, updateFundInput);
  }

  @Mutation(() => FundEntity)
  adjustFund(@Args('adjustFundInput') adjustFundInput: AdjustFundInput) {
    return this.fundsService.adjustFund(adjustFundInput);
  }

  @Mutation(() => FundEntity)
  removeFund(@Args('id', { type: () => Int }) id: number) {
    return this.fundsService.remove(id);
  }
}

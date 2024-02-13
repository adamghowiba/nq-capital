import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvestorsService } from './investors.service';
import { InvestorEntity } from './entities/investor.entity';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';

@Resolver(() => InvestorEntity)
export class InvestorsResolver {
  constructor(private readonly investorsService: InvestorsService) {}

  @Mutation(() => InvestorEntity)
  createInvestor(
    @Args('createInvestorInput') createInvestorInput: CreateInvestorInput
  ) {
    return this.investorsService.create(createInvestorInput);
  }

  @Query(() => [InvestorEntity], { name: 'investors' })
  findAll() {
    return this.investorsService.list();
  }

  @Query(() => InvestorEntity, { name: 'investor' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.investorsService.retrieve(id);
  }

  @Mutation(() => InvestorEntity)
  updateInvestor(
    @Args('updateInvestorInput') updateInvestorInput: UpdateInvestorInput
  ) {
    return this.investorsService.update(
      updateInvestorInput.id,
      updateInvestorInput
    );
  }

  @Mutation(() => InvestorEntity)
  removeInvestor(@Args('id', { type: () => Int }) id: number) {
    return this.investorsService.remove(id);
  }
}

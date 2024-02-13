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

@Resolver(() => FundEntity)
export class FundsResolver {
  constructor(private readonly fundsService: FundsService) {}

  @Mutation(() => FundEntity)
  createFund(@Args('createFundInput') createFundInput: CreateFundInput) {
    return this.fundsService.create(createFundInput);
  }

  @Query(() => [FundEntity], { name: 'funds' })
  list() {
    return this.fundsService.list();
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
  removeFund(@Args('id', { type: () => Int }) id: number) {
    return this.fundsService.remove(id);
  }
}

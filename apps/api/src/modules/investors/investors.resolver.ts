import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FundsService } from '../funds/funds.service';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';
import {
  InvestorFundEntity,
  InvestorFundWithoutInvestor as InvestorFundWithoutInvestorEntity,
} from './entities/investor-fund.entity';
import { InvestorEntity } from './entities/investor.entity';
import { InvestorsService } from './investors.service';
import { AddressEntity } from '../addresses/entities/address.entity';
import { PrismaService } from '@nq-capital/service-database';
import { BankAccountEntity } from './entities/bank-account.entity';

@Resolver(() => InvestorEntity)
export class InvestorsResolver {
  constructor(
    private readonly investorsService: InvestorsService,
    private readonly fundsService: FundsService,
    private readonly prisma: PrismaService
  ) {}

  @Mutation(() => InvestorEntity)
  createInvestor(
    @Args('createInvestorInput') createInvestorInput: CreateInvestorInput
  ) {
    return this.investorsService.create(createInvestorInput);
  }

  @Query(() => [InvestorEntity], { name: 'investors' })
  list() {
    return this.investorsService.list();
  }

  @Query(() => InvestorEntity, { name: 'investor' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.investorsService.retrieve(id);
  }

  @Query(() => [InvestorFundEntity], { name: 'investorFunds' })
  listInvestorFunds(
    @Args('investorId', { type: () => Int }) investorId: number
  ) {
    return this.investorsService.listInvestorFunds({ investorId });
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

  @ResolveField(() => AddressEntity, {
    name: 'address',
    complexity: 10,
    nullable: true,
  })
  async resolveAddress(
    @Parent() investor: InvestorEntity
  ): Promise<AddressEntity | null> {
    const address = await this.prisma.investor
      .findUnique({ where: { id: investor.id } })
      .address();

    return address;
  }

  @ResolveField(() => [BankAccountEntity], {
    name: 'bank_accounts',
    complexity: 10,
    nullable: true,
  })
  async resolveBankAccounts(@Parent() investor: InvestorEntity) {
    const bankAccounts = await this.investorsService.listInvestorBankAccounts({
      investorId: investor.id,
    });

    return bankAccounts;
  }
}

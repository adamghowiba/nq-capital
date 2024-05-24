import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver
} from '@nestjs/graphql';
import { Permission } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { InvestorSession } from '../../common/decorators/auth/session.decorator';
import { AddressEntity } from '../addresses/entities/address.entity';
import { BankAccountEntity } from '../bank-accounts/entities/bank-account.entity';
import { FundsService } from '../funds/funds.service';
import { CreateInvestorInput } from './dto/create-investor.input';
import { GetInvestorPortfolioArgs } from './dto/investor-portfilo.args';
import { UpdateInvestorInput } from './dto/update-investor.input';
import { InvestorPortfolioEntity } from './entities/investor-portfilo.entity';
import { InvestorEntity } from './entities/investor.entity';
import { InvestorsService } from './investors.service';

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

  @Permission('read', 'Investor')
  @Query(() => [InvestorEntity], { name: 'investors' })
  list() {
    return this.investorsService.list();
  }

  @Query(() => InvestorEntity, { name: 'investor' })
  retrieve(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.investorsService.retrieve(id);
  }

  @Permission('read', 'Investor')
  @Query(() => InvestorPortfolioEntity, { name: 'investorPortfolio' })
  retrieveInvestorPortfolio(
    @Args() args: GetInvestorPortfolioArgs,
    @InvestorSession() investor: InvestorEntity
  ) {
    return this.investorsService.getInvestorPortfolio(args?.id || investor?.id);
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
    const bankAccounts =
      await this.investorsService.getInvestorBankAccountsField({
        investorId: investor.id,
      });

    return bankAccounts;
  }
}

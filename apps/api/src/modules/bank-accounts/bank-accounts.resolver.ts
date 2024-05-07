import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountEntity } from './entities/bank-account.entity';
import { CreateBankAccountInput } from './dto/create-bank-account.input';
import { UpdateBankAccountInput } from './dto/update-bank-account.input';
import { InvestorSession } from '../../common/decorators/auth/session.decorator';
import { InvestorEntity } from '../investors/entities/investor.entity';

@Resolver(() => BankAccountEntity)
export class BankAccountsResolver {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Mutation(() => BankAccountEntity)
  createBankAccount(
    @Args('createBankAccountInput')
    createBankAccountInput: CreateBankAccountInput,
    @InvestorSession({throwOnNotFound: true}) investor: InvestorEntity
  ) {
    return this.bankAccountsService.create({
      ...createBankAccountInput,
      investor_id: investor.id,
    });
  }

  @Query(() => [BankAccountEntity], { name: 'bankAccounts' })
  list() {
    return this.bankAccountsService.list();
  }

  @Query(() => BankAccountEntity, { name: 'bankAccount' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.bankAccountsService.retrieve(id);
  }

  @Mutation(() => BankAccountEntity)
  updateBankAccount(
    @Args('updateBankAccountInput')
    updateBankAccountInput: UpdateBankAccountInput
  ) {
    return this.bankAccountsService.update(
      updateBankAccountInput.id,
      updateBankAccountInput
    );
  }

  @Mutation(() => BankAccountEntity)
  removeBankAccount(@Args('id', { type: () => Int }) id: number) {
    return this.bankAccountsService.remove(id);
  }
}

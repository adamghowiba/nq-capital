import { CreateBankAccountInput } from './create-bank-account.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBankAccountInput extends PartialType(
  CreateBankAccountInput
) {
  @Field(() => Int)
  id!: number;
}

import {
  Field,
  InputType,
  Int,
  OmitType,
  PartialType
} from '@nestjs/graphql';
import { CreateInvestorInput } from './create-investor.input';

@InputType()
export class UpdateInvestorInput extends PartialType(
  OmitType(CreateInvestorInput, ['bankAccountsCreateMany', 'bank_accounts'])
) {
  @Field(() => Int)
  id!: number;
}

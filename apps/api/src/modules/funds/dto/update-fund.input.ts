import {
  Field,
  InputType,
  Int,
  OmitType,
  PartialType
} from '@nestjs/graphql';
import { CreateFundInput } from './create-fund.input';

@InputType()
export class UpdateFundInput extends PartialType(
  OmitType(CreateFundInput, ['initial_balance', 'investors', 'initial_balance'])
) {
  @Field(() => Int)
  id!: number;
}

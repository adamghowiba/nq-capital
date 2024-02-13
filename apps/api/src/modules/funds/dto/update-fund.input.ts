import { CreateFundInput } from './create-fund.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateFundInput extends PartialType(
  OmitType(CreateFundInput, ['initial_balance'])
) {
  @Field(() => Int)
  id!: number;
}

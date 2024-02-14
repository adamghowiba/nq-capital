import { CreateInvestorFundInput } from './create-investor-fund.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvestorFundInput extends PartialType(
  CreateInvestorFundInput
) {
  @Field(() => Int)
  id: number;
}

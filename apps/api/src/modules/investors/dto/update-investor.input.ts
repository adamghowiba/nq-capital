import { CreateInvestorInput } from './create-investor.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateInvestorInput extends PartialType(CreateInvestorInput) {
  @Field(() => Int)
  id!: number;
}

import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddFundInvestorsInput {
  @Field(() => Int)
  id!: number;

  @Field(() => Int)
  investor_id!: number;

  @Field(() => Float)
  initial_investment!: number;
}

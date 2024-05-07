import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddInvestmentInput {
  // TODO: Should use default fund and make this optional
  @Field(() => Int)
  fund_id!: number;

  @Field(() => Int)
  investor_id!: number;

  @Field(() => Float)
  amount!: number;
}

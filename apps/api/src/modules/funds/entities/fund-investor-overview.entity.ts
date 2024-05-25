import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FundInvestorOverview {
  @Field(() => Int)
  investor_id!: number;

  @Field(() => String)
  first_name!: string;

  @Field(() => String)
  last_name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => Float)
  invested_amount!: number;

  @Field(() => Float)
  current_balance!: number;
}

import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class InvestorPortfolioEntity {
  @Field(() => Float)
  total_invested!: number;

  @Field(() => Float)
  total_balance!: number;

  @Field(() => Float)
  total_pending_transactions!: number;
}

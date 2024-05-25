import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PortfolioTotalEntity {
  @Field(() => Float)
  total_invested!: number;

  @Field(() => Float)
  total_balance!: number;

  @Field(() => Float)
  total_pending_transactions!: number;
}

@ObjectType()
export class InvestorPortfolioEntity extends PortfolioTotalEntity {
  @Field(() => PortfolioTotalEntity)
  previous_month!: PortfolioTotalEntity;

  @Field(() => Float)
  balance_change_percentage!: number;

  @Field(() => Float)
  balance_change_amount!: number;
}

import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FundOverviewEntity {
  @Field(() => Float)
  invested_amount!: number;

  @Field(() => Float)
  current_amount!: number;

  @Field(() => Float)
  net_returns!: number;
}

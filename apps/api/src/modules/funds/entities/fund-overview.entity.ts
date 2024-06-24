import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Timespan } from '../dto/get-fund-overview.args';

@ObjectType()
export class FundOverviewEntity {
  @Field(() => Float)
  invested_amount!: number;

  @Field(() => Float)
  current_amount!: number;

  @Field(() => Float)
  net_returns!: number;
}

@ObjectType()
export class FundOverviewHistoryItem {
  @Field(() => Float)
  date!: number;

  @Field(() => Float)
  amount!: number;
}

@ObjectType()
export class FundOverviewHistoryEntity {
  @Field(() => Timespan)
  timespan!: Timespan;

  @Field(() => [FundOverviewHistoryItem])
  data!: FundOverviewHistoryItem[];
}

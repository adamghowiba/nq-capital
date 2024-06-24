import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

export const Timespan = {
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type Timespan = (typeof Timespan)[keyof typeof Timespan];

registerEnumType(Timespan, {
  name: 'Timespan',
});

@ArgsType()
export class GetFundOverViewArgs {
  /**
   * The fund ids to get the overview for. If not fund is specified
   * the overview for all funds will be returned.
   */
  @Field(() => [Int], { nullable: true })
  fund_ids!: number[];
}

@ArgsType()
export class GetFundOverviewHistoryArgs {
  /**
   * The fund ids to get the overview for. If not fund is specified
   * the overview for all funds will be returned.
   */
  @Field(() => [Int], { nullable: true })
  fund_ids!: number[];

  @Field(() => Timespan, { nullable: true })
  timespan: Timespan = 'year';
}

import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetFundOverViewArgs {
  /**
   * The fund ids to get the overview for. If not fund is specified
   * the overview for all funds will be returned.
   */
  @Field(() => [Int], { nullable: true })
  fund_ids!: number[];
}

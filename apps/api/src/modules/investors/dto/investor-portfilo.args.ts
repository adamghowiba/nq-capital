import {
  ArgsType,
  Field,
  Int
} from '@nestjs/graphql';

@ArgsType()
export class GetInvestorPortfolioArgs {
  @Field(() => Int, { nullable: true })
  id?: number;
}

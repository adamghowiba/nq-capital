import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '../../../common/dto/pagination.args';

@ArgsType()
export class ListInvestorFundArgs extends PaginationArgs {
  /**
   * FIlter by an investor's ID
   */
  @Field(() => Number, { nullable: true })
  investorId?: number;

  /**
   * FIlter by a fund ID
   */
  @Field(() => Number, { nullable: true })
  fundId?: number;
}

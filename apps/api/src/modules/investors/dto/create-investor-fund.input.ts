import {
  Field,
  Float,
  InputType,
  Int
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';
import {
  IsDecimal,
  IsNumber,
  Max,
  Min
} from 'class-validator';

@InputType()
export class CreateInvestorFundInput
  implements Prisma.InvestorFundUncheckedCreateInput
{
  /**
   * Percentage of the fund the investor has staked.. e.g. 0.5 for 50%
   * @example 0.5
   */
  @IsNumber()
  @Max(1)
  @Min(0)
  @Field(() => Float)
  stake_percentage!: string | number | Prisma.Decimal | DecimalJsLike;

  @IsNumber()
  @Min(0)
  @Field(() => Float)
  initial_investment!: number

  @IsNumber()
  @Field(() => Int)
  investor_id!: number;

  @IsNumber()
  @Field(() => Int)
  fund_id!: number;
}

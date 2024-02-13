import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsDecimal, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateInvestorFundInput } from '../../investors/dto/create-investor-fund.input';

@InputType()
export class CreateNestedInvestorFundWithoutFundInput extends OmitType(
  CreateInvestorFundInput,
  ['fund_id']
) {}

@InputType()
export class CreateFundInput
  implements Omit<Prisma.FundUncheckedCreateInput, 'balance' | 'investors'>
{
  @Field(() => String)
  @IsString()
  name!: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  initial_balance?: number;

  /**
   * Investor fund
   */
  @Field(() => [CreateNestedInvestorFundWithoutFundInput], { nullable: true })
  investors?: CreateNestedInvestorFundWithoutFundInput[];
}

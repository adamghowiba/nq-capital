import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class CreateInvestorFundInput
  implements Omit<Prisma.InvestorFundUncheckedCreateInput, 'stake_percentage' | 'invested_amount'>
{

  @IsNumber()
  @Min(0)
  @Field(() => Float)
  initial_investment!: number;

  @IsNumber()
  @Field(() => Int)
  investor_id!: number;

  @IsNumber()
  @Field(() => Int)
  fund_id!: number;
}

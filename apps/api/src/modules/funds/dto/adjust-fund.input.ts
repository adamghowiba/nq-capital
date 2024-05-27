import { Field, Float, HideField, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class AdjustFundInput {
  /**
   * Amount to adjust the fund by. Can be a negative
   * or positive value.
   * @example 100.00
   */
  @Field(() => Float)
  @IsNumber()
  amount!: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  fund_id!: number;

  @HideField()
  adjusted_by_user_id!: number;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;
}

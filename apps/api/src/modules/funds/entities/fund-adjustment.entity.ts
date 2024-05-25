import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { FundAdjustment } from '@prisma/client';

@ObjectType()
export class FundAdjustmentEntity implements FundAdjustment {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Float)
  amount!: number;

  @Field(() => Float)
  balance_before!: number;

  @Field(() => Float)
  balance_after!: number;

  @Field(() => Int)
  fund_id!: number;

  @Field(() => Int)
  adjusted_by_user_id!: number;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

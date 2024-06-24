import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WithdrawalInput {
  @Field(() => Int)
  investor_id!: number;

  @Field(() => Float)
  amount!: number;

  @Field(() => Int, { nullable: true })
  bank_account_id?: number;
}

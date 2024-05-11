import { Field, Float, GraphQLISODateTime, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Prisma, Transaction, TransactionStatus, TransactionType } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@ObjectType()
export class TransactionEntity implements Transaction {
  @Field(() => Int)
  id!: number;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => Int)
  amount!: number;

  @Field(() => String)
  currency_code!: string;

  @Field(() => Float)
  balance_after!: number;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Float, { nullable: true })
  fee!: Decimal | null;

  @Field(() => String, { nullable: true })
  external_id!: string | null;

  @Field(() => Int, { nullable: true })
  investor_id!: number | null;

  @Field(() => TransactionStatus)
  status!: TransactionStatus;

  @HideField()
  meta!: Prisma.JsonValue;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

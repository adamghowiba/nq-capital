import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { BankAccount, BankAccountType } from '@prisma/client';

registerEnumType(BankAccountType, { name: 'BankAccountType' });

@ObjectType()
export class BankAccountEntity implements BankAccount {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  nickname!: string | null;

  @Field(() => String)
  bank_name!: string;

  @Field(() => String)
  account_number!: string;

  @Field(() => String)
  account_holder_name!: string;

  @Field(() => BankAccountType, { nullable: true })
  type!: BankAccountType | null;

  @Field(() => String)
  bank_country!: string;

  @Field(() => String)
  currency!: string;

  @Field(() => String, { nullable: true })
  routing_number!: string | null;

  @Field(() => String, { nullable: true })
  swift_code!: string | null;

  @Field(() => String, { nullable: true })
  iban!: string | null;

  @Field(() => String, { nullable: true })
  sort_code!: string | null;

  @Field(() => String, { nullable: true })
  bsb_number!: string | null;

  @Field(() => String, { nullable: true })
  bank_code!: string | null;

  @Field(() => String, { nullable: true })
  branch_code!: string | null;

  @Field(() => String, { nullable: true })
  branch_address!: string | null;

  @Field(() => Boolean)
  is_primary!: boolean;

  @Field(() => Int)
  investor_id!: number;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

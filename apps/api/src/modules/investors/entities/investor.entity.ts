import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Investor, InvestorAccountStatus } from '@prisma/client';
import { BankAccountEntity } from './bank-account.entity';

registerEnumType(InvestorAccountStatus, { name: 'InvestorAccountStatus' });

@ObjectType()
export class InvestorEntity implements Investor {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  first_name!: string;

  @Field(() => String, { nullable: true })
  middle_name!: string | null;

  @Field(() => String)
  last_name!: string;

  @Field(() => String)
  email!: string;

  @Field({ nullable: true })
  password!: string | null;

  @Field({ nullable: true })
  passport_number!: string | null;

  @Field({ nullable: true })
  national_id!: string | null;

  @Field({ nullable: true })
  date_of_birth!: Date | null;

  @Field({ nullable: true })
  nationality!: string | null;

  @Field({ nullable: true })
  company_name!: string | null;

  @Field({ nullable: true })
  company_tax_id!: string | null;

  @Field({ nullable: true })
  is_accredited!: boolean | null;

  @Field({ nullable: true })
  avatar!: string | null;

  @Field({ nullable: true })
  mobile_number!: string | null;

  @Field(() => InvestorAccountStatus, { nullable: true })
  account_status!: InvestorAccountStatus;

  @Field({ nullable: true })
  address_id!: number | null;

  created_at!: Date;

  updated_at!: Date;
}

import {
  Field,
  GraphQLISODateTime,
  HideField,
  InputType,
  Int,
  OmitType,
  createUnionType,
} from '@nestjs/graphql';
import { BankAccountType, InvestorAccountStatus, Prisma } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  Allow,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO4217CurrencyCode,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateInvestorInput
  implements Omit<Prisma.InvestorUncheckedCreateInput, 'bank_accounts'>
{
  /**
   * Investor first name
   */
  @IsString()
  @Field(() => String)
  first_name!: string;

  /**
   * Investor middle name
   */
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  middle_name?: string | null;

  @IsString()
  @Field(() => String)
  last_name!: string;

  @IsEmail()
  @Field(() => String)
  email!: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  password?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  passport_number?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  national_id?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  date_of_birth?: string | Date | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  nationality?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  company_name?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  company_tax_id?: string | null;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  is_accredited?: boolean | null;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  mobile_number?: string | null;

  @IsNumber()
  @IsOptional()
  address_id?: number | null;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BankAccountWithoutInvestorInput)
  @Field(() => [BankAccountWithoutInvestorInput], { nullable: true })
  bank_accounts?: BankAccountWithoutInvestorInput[];

  @HideField()
  notes?: Prisma.NoteUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  invested_funds?: Prisma.InvestorFundUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  created_at?: string | Date;

  @HideField()
  updated_at?: string | Date;

  @HideField()
  avatar?: string | null;

  @HideField()
  account_status?: InvestorAccountStatus;

  @HideField()
  get bankAccountsCreateMany():
    | Prisma.BankAccountCreateNestedManyWithoutInvestorInput
    | undefined {
    if (!this.bank_accounts) return undefined;

    return {
      createMany: {
        data: this.bank_accounts,
      },
    };
  }
}

@InputType()
export class BankAccountInput
  implements Prisma.BankAccountUncheckedCreateInput
{
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  nickname?: string | null | undefined;

  @IsString()
  @Field(() => String)
  bank_name!: string;

  @IsString()
  @Field(() => String)
  account_number!: string;

  @IsString()
  @Field(() => String)
  account_holder_name!: string;

  @IsEnum(BankAccountType)
  @IsOptional()
  @Field(() => BankAccountType, { nullable: true })
  type?: BankAccountType | null | undefined;

  @IsString()
  @Field(() => String)
  bank_country!: string;

  @IsISO4217CurrencyCode()
  @Field(() => String)
  currency!: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  routing_number?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  swift_code?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  iban?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  sort_code?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  bsb_number?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  bank_code?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  branch_code?: string | null | undefined;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  branch_address?: string | null | undefined;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  is_primary?: boolean | undefined;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  investor_id!: number;
}

@InputType()
export class BankAccountWithoutInvestorInput extends OmitType(
  BankAccountInput,
  ['investor_id']
) {}

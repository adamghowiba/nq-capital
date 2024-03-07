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
  first_name!: string;

  /**
   * Investor middle name
   */
  @IsString()
  @IsOptional()
  middle_name?: string | null;

  @IsString()
  last_name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  password?: string | null;

  @IsString()
  @IsOptional()
  passport_number?: string | null;

  @IsString()
  @IsOptional()
  national_id?: string | null;

  @IsString()
  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  date_of_birth?: string | Date | null;

  @IsString()
  @IsOptional()
  nationality?: string | null;

  @IsString()
  @IsOptional()
  company_name?: string | null;

  @IsString()
  @IsOptional()
  company_tax_id?: string | null;

  @IsBoolean()
  @IsOptional()
  is_accredited?: boolean | null;

  @IsString()
  @IsOptional()
  avatar?: string | null;

  @IsString()
  @IsOptional()
  mobile_number?: string | null;

  @HideField()
  @Field(() => InvestorAccountStatus)
  account_status?: InvestorAccountStatus;

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

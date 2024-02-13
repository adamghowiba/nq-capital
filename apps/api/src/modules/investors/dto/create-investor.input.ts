import {
  Field,
  GraphQLISODateTime,
  HideField,
  InputType
} from '@nestjs/graphql';
import { InvestorAccountStatus, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

@InputType()
export class CreateInvestorInput
  implements Prisma.InvestorUncheckedCreateInput
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

  @HideField()
  notes?: Prisma.NoteUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  invested_funds?: Prisma.InvestorFundUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  bank_accounts?: Prisma.BankAccountUncheckedCreateNestedManyWithoutInvestorInput;

  @HideField()
  created_at?: string | Date;

  @HideField()
  updated_at?: string | Date;
}

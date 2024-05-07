import { Field, HideField, InputType } from '@nestjs/graphql';
import { BankAccountType, Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateBankAccountInput
  implements Prisma.BankAccountUncheckedCreateInput
{
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  nickname?: string | null | undefined;

  @Field(() => String)
  @IsString()
  bank_name!: string;

  @Field(() => String)
  @IsString()
  account_number!: string;

  @Field(() => String)
  @IsString()
  account_holder_name!: string;

  @Field(() => BankAccountType, { nullable: true })
  @IsEnum(BankAccountType)
  @IsOptional()
  type?: BankAccountType | null | undefined;

  @Field(() => String)
  @IsString()
  bank_country!: string;

  @Field(() => String)
  @IsString()
  currency!: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  routing_number?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  swift_code?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  iban?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  sort_code?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  bsb_number?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  bank_code?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  branch_code?: string | null | undefined;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  branch_address?: string | null | undefined;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  is_primary?: boolean | undefined;

  @HideField()
  investor_id!: number;
}

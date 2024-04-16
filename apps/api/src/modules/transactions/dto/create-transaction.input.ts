import {
  InputType,
  Int,
  Field,
  registerEnumType,
  Float,
  HideField,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  $Enums,
  Prisma,
  Transaction,
  TransactionStatus,
  TransactionType,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsEnum,
  IsISO4217CurrencyCode,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

registerEnumType(TransactionType, { name: 'TransactionType' });
registerEnumType(TransactionStatus, { name: 'TransactionStatus' });

@InputType()
export class CreateTransactionInput
  implements Prisma.TransactionUncheckedCreateInput
{
  @Field(() => TransactionType)
  @IsEnum(TransactionType)
  type!: TransactionType;

  @Field(() => Int)
  @IsNumber()
  amount!: number;

  @Field(() => String)
  @IsISO4217CurrencyCode()
  currency_code!: string;

  @Field(() => Int)
  @IsNumber()
  balance_after!: number;

  @Field(() => Int, { nullable: true })
  @IsString()
  @IsOptional()
  description!: string | null;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  fee!: Decimal | null;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  external_id!: string | null;

  @Field(() => TransactionStatus)
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;
}

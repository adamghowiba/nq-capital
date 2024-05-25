import {
  Field,
  Float,
  InputType,
  Int,
  registerEnumType
} from '@nestjs/graphql';
import {
  Prisma,
  TransactionStatus,
  TransactionType
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

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  notes!: string | null;

  @Field(() => TransactionStatus)
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;
}

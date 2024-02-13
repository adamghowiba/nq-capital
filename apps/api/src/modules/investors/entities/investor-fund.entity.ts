import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { InvestorFund } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { FundEntity } from '../../funds/entities/fund.entity';
import { InvestorEntity } from './investor.entity';

@ObjectType()
export class InvestorFundEntity
  implements Omit<InvestorFund, 'stake_percentage'>
{
  @Field(() => Int)
  id!: number;

  @Field(() => Float)
  stake_percentage!: number;

  @Field(() => Int)
  initial_investment!: number;

  @Field(() => Int)
  investor_id!: number;

  @Field(() => Int)
  fund_id!: number;

  @Field(() => InvestorEntity)
  investor!: InvestorEntity;

  @Field(() => FundEntity)
  fund!: FundEntity;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

@ObjectType()
export class InvestorFundWithBalanceEntity extends InvestorFundEntity {
  @Field(() => Float)
  investor_balance_in_fund!: number;
}

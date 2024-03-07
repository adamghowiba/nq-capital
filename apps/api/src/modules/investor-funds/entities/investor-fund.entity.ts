import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { InvestorFund } from '@prisma/client';
import { FundEntity } from '../../funds/entities/fund.entity';
import { InvestorEntity } from '../../investors/entities/investor.entity';
import { Paginated } from '../../../common/entities/api-pagination.entity';

@ObjectType()
export class InvestorFundEntity
  implements Omit<InvestorFund, 'stake_percentage'>
{
  @Field(() => Int)
  id!: number;

  @Field(() => Float)
  stake_percentage!: number;

  @Field(() => Float)
  invested_amount!: number;

  @Field(() => Int)
  initial_investment!: number;

  @Field(() => Int)
  investor_id!: number;

  @Field(() => Int)
  fund_id!: number;

  @Field(() => InvestorEntity)
  investor!: InvestorEntity;

  @Field(() => Float)
  investor_balance_in_fund!: number;

  @Field(() => FundEntity)
  fund!: FundEntity;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

@ObjectType()
export class PaginatedInvestorFundEntity extends Paginated(
  InvestorFundEntity
) {}

@ObjectType()
export class InvestorFundWithoutInvestor extends OmitType(InvestorFundEntity, [
  'investor',
]) {}

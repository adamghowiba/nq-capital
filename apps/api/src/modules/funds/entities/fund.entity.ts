import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Fund } from '@prisma/client';

@ObjectType()
export class FundEntity implements Fund {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => Float)
  balance!: number;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

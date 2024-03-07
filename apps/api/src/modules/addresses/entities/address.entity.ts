import { ObjectType, Field, Int, Float, HideField, GraphQLISODateTime } from '@nestjs/graphql';
import { Address, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@ObjectType()
export class AddressEntity implements Address {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  street!: string;

  @Field(() => String, {nullable: true})
  street_2!: string | null;

  @Field(() => String)
  city!: string;

  @Field(() => String)
  state_province!: string;

  @Field(() => String, {nullable: true})
  postal_zip_code!: string | null;

  @Field(() => String)
  country!: string;

  @Field(() => String)
  country_code!: string;

  @Field(() => Float)
  latitude!: Decimal;

  @Field(() => Float)
  longitude!: Decimal;

  @HideField()
  additional_info!: Prisma.JsonValue;

  @Field(() => Float)
  verified!: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

}

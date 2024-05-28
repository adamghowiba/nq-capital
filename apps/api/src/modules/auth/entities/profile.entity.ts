import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';

@ObjectType()
export class ProfileEntity {
  @Field(() => Int, { nullable: true })
  id!: number;

  @Field(() => UserType)
  type!: UserType;

  @Field(() => String)
  first_name!: string;

  @Field(() => String)
  last_name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String, { nullable: true })
  middle_name!: string | null;

  @Field(() => String)
  password!: string | null;

  constructor(params: ProfileEntity) {
    Object.assign(this, params);
  }
}

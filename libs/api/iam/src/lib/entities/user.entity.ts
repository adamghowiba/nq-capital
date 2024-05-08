import {
  Field,
  HideField,
  Int,
  ObjectType,
  registerEnumType
} from '@nestjs/graphql';
import { User, UserRole } from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Role of a given user',
});

@ObjectType()
export class UserEntity implements User {
  /**
   * Incremental based user ID
   */
  @Field(() => Int)
  id!: number;

  first_name!: string;

  last_name!: string;

  email!: string;

  @Field({ nullable: true })
  middle_name!: string | null;

  @Field({ nullable: true })
  avatar!: string | null;

  @Field({ nullable: true })
  mobile_number!: string | null;

  @Field(() => UserRole)
  role!: UserRole;

  @HideField()
  password!: string;

  created_at!: Date;

  updated_at!: Date;
}

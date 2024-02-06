import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { $Enums, User, UserRole } from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Role of a given user',
});

@ObjectType()
export class UserEntity implements User {
  /**
   * Incremental based user ID
   */
  @Field(() => ID)
  id: number;

  first_name: string;

  middle_name: string;

  last_name: string;

  password: string;

  avatar: string;

  mobile_number: string;

  email: string;

  @Field(() => UserRole)
  role: UserRole;

  created_at: Date;

  updated_at: Date;
}

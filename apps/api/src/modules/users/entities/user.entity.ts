import {
  ObjectType,
  Field,
  Int,
  ID,
  registerEnumType,
  HideField,
} from '@nestjs/graphql';
import { $Enums, User, UserRole } from '@prisma/client';
import { Paginated } from '../../../common/entities/api-pagination.entity';
import { isNullableType } from 'graphql';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Role of a given user',
});

type NullableToOptional<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends null ? T[K] | undefined : T[K];
};

@ObjectType()
export class UserEntity implements User {
  /**
   * Incremental based user ID
   */
  @Field(() => ID)
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

@ObjectType()
export class PaginatedUserEntity extends Paginated(UserEntity) {}

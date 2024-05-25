import {
  ObjectType
} from '@nestjs/graphql';
import { Paginated } from '../../../common/entities/api-pagination.entity';
import { UserEntity } from '@nq-capital/iam';

// registerEnumType(UserRole, {
//   name: 'UserRole',
//   description: 'Role of a given user',
// });

// @ObjectType()
// export class UserEntity implements User {
//   /**
//    * Incremental based user ID
//    */
//   @Field(() => Int)
//   id!: number;

//   first_name!: string;

//   last_name!: string;

//   email!: string;

//   @Field({ nullable: true })
//   middle_name!: string | null;

//   @Field({ nullable: true })
//   avatar!: string | null;

//   @Field({ nullable: true })
//   mobile_number!: string | null;

//   @Field(() => UserRole)
//   role!: UserRole;

//   @HideField()
//   password!: string;

//   created_at!: Date;

//   updated_at!: Date;
// }

@ObjectType()
export class PaginatedUserEntity extends Paginated(UserEntity) {}

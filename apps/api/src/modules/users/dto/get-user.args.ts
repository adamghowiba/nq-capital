import { ArgsType, Field } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { PaginationArgs } from '../../../common/dto/pagination.args';

@ArgsType()
export class ListUserArgs extends PaginationArgs {
  /**
   * Filter users by a specific role
   */
  @Field(() => UserRole)
  role?: UserRole;
}

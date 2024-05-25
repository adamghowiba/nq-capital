import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { ListUserArgs } from './dto/get-user.args';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginatedUserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseInterceptors } from '@nestjs/common';
import { PaginationInterceptor } from '../../common/interceptors/pagination.interceptor';
import { UserEntity } from '@nq-capital/iam';

@UseInterceptors(PaginationInterceptor)
@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUserEntity, { name: 'users' })
  list(@Args() listUserArgs: ListUserArgs) {
    return this.usersService.list(listUserArgs);
  }

  @Query(() => UserEntity, { name: 'user' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.retrieve({ id });
  }

  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}

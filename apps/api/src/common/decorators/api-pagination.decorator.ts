import { applyDecorators, createParamDecorator } from '@nestjs/common';
import {
  Field,
  GqlExecutionContext,
  InputType,
  Int,
  ObjectType,
  Query,
  QueryOptions,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { UserEntity } from '../../modules/users/entities/user.entity';

export const getPaginatedEntity = <T extends ReturnTypeFuncValue>(
  type: T
): T => {

  @ObjectType()
  class PaginatedEntity {
    @Field(() => Int)
    count: number;

    @Field(() => UserEntity)
    data: UserEntity;
  }

  return PaginatedEntity as T;
};

export const PaginatedQuery = <T extends ReturnTypeFuncValue>(
  type: T,
  options?: QueryOptions
) => Query(() => getPaginatedEntity(type), options);

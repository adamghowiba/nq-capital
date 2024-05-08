import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserAbility = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    return GqlExecutionContext.create(ctx).getContext()?.ability;
  }
);

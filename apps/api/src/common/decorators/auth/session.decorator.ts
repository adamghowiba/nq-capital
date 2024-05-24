import {
  ExecutionContext,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { ApiError } from '../../exceptions/api.error';

export const GqlSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const gqlContext = context.getContext<{ req: Request; headers: Headers }>();

    /** Since a user can be logged into both an admin or investor account,
     * we send down the authority to differentiate where the call came form. */
    const authority = gqlContext.req.headers?.authority;
    const application = gqlContext.req.headers?.application;

    return {
      ...(gqlContext.req?.user || { user: null, investor: null }),
      user_type: authority,
      application,
    };
  }
);

export const InvestorSession = createParamDecorator(
  (data: { throwOnNotFound?: boolean }, ctx: ExecutionContext) => {
    const throwOnNotFound = data?.throwOnNotFound ?? true;
    const context = GqlExecutionContext.create(ctx);
    const gqlContext = context.getContext<{ req: Request; headers: Headers }>();

    if (throwOnNotFound && !gqlContext.req?.user?.investor)
      throw new ApiError('You must be logged into to preform this action', {
        statusCode: HttpStatus.FORBIDDEN,
      });

    return gqlContext.req?.user?.investor;
  }
);

export const UserSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const gqlContext = context.getContext<{ req: Request; headers: Headers }>();

    return gqlContext.req?.user?.user;
  }
);

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const GqlSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const gqlContext = context.getContext<{ req: Request; headers: Headers }>();

    return gqlContext.req?.user?.user;
  }
);

export const InvestorSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const gqlContext = context.getContext<{ req: Request; headers: Headers }>();

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

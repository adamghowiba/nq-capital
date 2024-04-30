import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { INVESTORS_PORTAL_URL } from '@nq-capital/utils-constants';
import { Application } from '../../../modules/auth/entities/session.entity';
import { Request } from 'express';

export const GqlSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const gqlContext = context.getContext<{ req: Request; headers: Headers }>();

    const originalUrl = gqlContext.req.originalUrl;
    const application: Application = originalUrl.includes(
      INVESTORS_PORTAL_URL.host
    )
      ? 'investors_portal'
      : 'admin_portal';

    return {
      ...(gqlContext.req?.user || { user: null, investor: null }),
      application,
    };
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

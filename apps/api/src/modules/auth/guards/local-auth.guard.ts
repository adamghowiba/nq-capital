import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super({ keepSessionInfo: true })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctxRequest = GqlExecutionContext.create(context).getContext().req as Request

    await super.logIn(ctxRequest)

    return !!ctxRequest
  }
}

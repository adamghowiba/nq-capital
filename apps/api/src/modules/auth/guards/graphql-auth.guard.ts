import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const gqlReq = ctx.getContext().req
    const loginInput = ctx.getArgs()?.loginInput

    gqlReq.body.email = loginInput.email
    gqlReq.body.password = loginInput.password
    gqlReq.body.user_type = loginInput.user_type

    return gqlReq
  }
}

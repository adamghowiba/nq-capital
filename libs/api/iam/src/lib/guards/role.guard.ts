import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  GqlContextType,
  GqlExecutionContext,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { Request } from 'express';
import {
  getInvestorAbility,
  getSessionAbilityFactory,
} from '../role/role.service';
import {
  PERMISSION_METADATA_KEY,
  PermissionMetadata,
} from '../decorators/permission.decorator';
import { GraphQLArgument, GraphQLError, GraphQLResolveInfo } from 'graphql';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger(RoleGuard.name);

  constructor(private readonly reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> | Promise<boolean> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const info = ctx.getInfo<GraphQLResolveInfo>();
      const args = ctx.getArgs();

      const permissions = this.reflector.get<PermissionMetadata>(
        PERMISSION_METADATA_KEY,
        ctx.getHandler()
      );

      if (!permissions) {
        this.logger.debug('No policy found for, assuming public');
        return true;
      }
      const request = ctx.getContext<{ req: Request }>().req;

      if (permissions && !request.user.investor && !request.user.user)
        throw new UnauthorizedException(
          'You must be logged in to perform this action'
        );

      const ability = getSessionAbilityFactory(request.user);

      if (!ability)
        throw new InternalServerErrorException(
          'Unable to determine permissions for this request'
        );

      const hasPermission = ability.can(
        permissions.action,
        permissions.subject
      );

      if (!hasPermission)
        throw new ForbiddenException(
          'You do not have permission to access this resource'
        );

      ctx.getContext().ability = ability;

      return true;
    }

    return true;
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import type { Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { ApiError } from '../exceptions/api.error';

// TODO: specify HTTP exception & create another filter for catch all;
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpException.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const info = gqlHost.getInfo<GraphQLResolveInfo>();

      this.logger.error(
        exception,
        exception?.getResponse ? exception.getResponse() : exception?.message,
        { field: info?.fieldName }
      );

      return new ApiError(exception?.message || 'API Error occurred', {
        statusCode: 500,
      });
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception)

    response.json({ error: exception?.message, stack: exception?.stack });
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { map } from 'rxjs';
import { IPaginatedType } from '../entities/api-pagination.entity';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const gql = GqlExecutionContext.create(context);
    const info = gql.getInfo();
    const limit = info.variableValues?.limit || 100;
    const page = info.variableValues?.page || 0;

    // Early return if the operation is not a query
    if (info?.operation?.operation !== 'query') return next.handle();

    return next.handle().pipe(
      map((value): IPaginatedType<any> => {
        const data = value?.data ? value.data : value;
        const hasNextPage = data.length < limit;

        return {
          data,
          limit,
          page,
          hasNextPage,
          count: data.length,
        };
      })
    );
  }
}

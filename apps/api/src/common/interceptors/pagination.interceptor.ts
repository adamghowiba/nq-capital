import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { map } from 'rxjs';
import { IPaginatedType } from '../entities/api-pagination.entity';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from '../dto/pagination.args';

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const gql = GqlExecutionContext.create(context);
    const info = gql.getInfo();
    const limit = info.variableValues?.limit || DEFAULT_PAGINATION_LIMIT;
    const page = info.variableValues?.page || DEFAULT_PAGINATION_PAGE;

    // Early return if the operation is not a query
    if (info?.operation?.operation !== 'query') return next.handle();

    return next.handle().pipe(
      map((value): IPaginatedType<any> => {
        const data = (value?.data ? value.data : value) || [];
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

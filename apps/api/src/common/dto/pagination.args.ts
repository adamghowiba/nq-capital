import { ArgsType, Directive, Field, HideField, Int } from '@nestjs/graphql';

/**
 * The default limit for pagination
 * @default 100
 */
export const DEFAULT_PAGINATION_LIMIT = 100;

/**
 * The default page for pagination
 * @default 0
 */
export const DEFAULT_PAGINATION_PAGE = 0;

@ArgsType()
export class PaginationArgs {
  /**
   * The page number to retrieve starting from zero
   * @default 0
   */
  @Field(() => Int)
  page = DEFAULT_PAGINATION_PAGE;

  /**
   * The number of items to retrieve for a given page
   * @default 100
   */
  @Field(() => Int)
  limit = DEFAULT_PAGINATION_LIMIT;

  @HideField()
  get offset() {
    return { take: this.limit, skip: this.page * this.limit };
  }
}

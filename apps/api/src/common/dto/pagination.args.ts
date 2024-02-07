import { ArgsType, Directive, Field, HideField, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  /**
   * The page number to retrieve starting from zero
   * @default 0
   */
  @Field(() => Int)
  page = 100;

  /**
   * The number of items to retrieve for a given page
   * @default 100
   */
  @Field(() => Int)
  limit = 100;

  @HideField()
  get offset() {
    return { take: this.limit, skip: (this.page + 1) * this.limit };
  }
}

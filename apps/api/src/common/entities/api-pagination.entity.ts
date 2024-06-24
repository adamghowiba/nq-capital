import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IPaginatedType<T> {
  data: T[];
  limit: number;
  page: number;
  count: number;
  hasNextPage: boolean;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [classRef])
    data!: T[];

    @Field(() => Int)
    limit!: number;

    @Field(() => Int)
    page!: number;

    @Field(() => Int)
    count!: number;

    @Field(() => Boolean)
    hasNextPage!: boolean;
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}

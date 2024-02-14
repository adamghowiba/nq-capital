import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class InvestorFund {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

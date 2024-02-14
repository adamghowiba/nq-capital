import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInvestorFundInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

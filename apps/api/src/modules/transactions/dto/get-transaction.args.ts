import { ArgsType, Field, Int } from "@nestjs/graphql";
import { TransactionStatus, TransactionType } from "@prisma/client";

@ArgsType()
export class ListTransactionsArgs {
  @Field(() => Int, { nullable: true })
  investorId?: number;

  @Field(() => Int, { nullable: true })
  fundId?: number;

  @Field(() => [TransactionStatus], { nullable: true })
  status?: TransactionStatus[];

  @Field(() => [TransactionType], { nullable: true })
  type?: TransactionType[];
}

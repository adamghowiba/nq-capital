import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { $Enums, Message, UserType } from '@prisma/client';

@ObjectType()
export class MessageEntity implements Message {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  content!: string;

  @Field(() => UserType)
  type!: $Enums.UserType;

  @Field(() => Int, { nullable: true })
  ticket_id!: number | null;

  @Field(() => Int, { nullable: true })
  sent_by_user_id!: number | null;

  @Field(() => Int, { nullable: true })
  sent_by_investor_id!: number | null;

  @Field(() => Int)
  edit_count!: number;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;
}

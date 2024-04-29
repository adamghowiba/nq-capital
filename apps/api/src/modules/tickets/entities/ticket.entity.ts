import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Prisma,
  TicketPriority,
  Ticket,
  TicketStatus,
  TicketType,
} from '@prisma/client';

import GraphQLJSON from 'graphql-type-json';

registerEnumType(TicketType, {
  name: 'TicketType',
  description: 'Type of ticket',
});

registerEnumType(TicketStatus, {
  name: 'TicketStatus',
  description: 'Status of ticket',
});

registerEnumType(TicketPriority, {
  name: 'TicketPriority',
  description: 'Priority of ticket',
});

@ObjectType()
export class TicketEntity implements Ticket {
  @Field(() => Int)
  id!: number;

  @Field(() => GraphQLJSON)
  data!: Prisma.JsonValue;

  @Field(() => TicketPriority)
  priority!: TicketPriority;

  @Field(() => TicketType)
  type!: TicketType;

  @Field(() => TicketStatus)
  status!: TicketStatus;

  @Field(() => Int)
  investor_id!: number;

  @Field(() => Int, { nullable: true })
  assigned_to_user_id!: number | null;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;
}

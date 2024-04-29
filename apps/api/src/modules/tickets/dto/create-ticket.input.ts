import { Field, HideField, InputType, Int } from '@nestjs/graphql';
import {
  $Enums,
  Prisma,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '@prisma/client';
import { IsEnum, IsNumber, IsObject, IsOptional, Min } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateTicketInput implements Prisma.TicketUncheckedCreateInput {
  @HideField()
  id?: number | undefined;

  @Field(() => GraphQLJSON)
  @IsObject()
  data!: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;

  @Field(() => TicketPriority, { nullable: true, defaultValue: 'MEDIUM' })
  priority?: TicketPriority = 'MEDIUM';

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(1)
  investor_id!: number;

  @Field(() => Int)
  @IsNumber()
  @IsOptional()
  @Min(1)
  assigned_to_user_id?: number | null | undefined;

  @HideField()
  messages?:
    | Prisma.MessageUncheckedCreateNestedManyWithoutTicketInput
    | undefined;

  @Field(() => TicketType)
  @IsEnum(TicketType)
  type!: TicketType;

  @Field(() => TicketStatus, { nullable: true })
  @IsEnum(TicketStatus)
  status?: TicketStatus | undefined = 'OPEN';

  @HideField()
  updated_at?: string | Date | undefined;

  @HideField()
  created_at?: string | Date | undefined;
}

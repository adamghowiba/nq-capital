import { Field, HideField, InputType } from '@nestjs/graphql';
import { $Enums, Prisma, UserType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

@InputType()
export class CreateMessageInput implements Prisma.MessageUncheckedCreateInput {
  @HideField()
  id?: number | undefined;

  @Field(() => String)
  @IsString()
  @Transform((params) => (params.value ? params.value?.trim?.() : params.value))
  content!: string;

  @Field(() => UserType)
  type!: $Enums.UserType;

  @HideField()
  ticket_id?: number | null | undefined;

  @HideField()
  edit_count?: number | undefined;

  @HideField()
  updated_at?: string | Date | undefined;

  @HideField()
  created_at?: string | Date | undefined;
}

@InputType()
export class CreateTicketMessageInput
  extends CreateMessageInput
  implements Prisma.MessageCreateWithoutTicketInput
{
  @Field(() => Number)
  ticket_id!: number;
}

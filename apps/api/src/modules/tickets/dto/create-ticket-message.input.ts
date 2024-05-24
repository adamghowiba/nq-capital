import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SendMessageInput } from '../../messages/dto/create-message.input';

@InputType()
export class SendTicketMessageInput
  extends OmitType(SendMessageInput, ['type'])
  implements Omit<Prisma.MessageCreateWithoutTicketInput, 'type'>
{
  @Field(() => Number)
  ticket_id!: number;
}

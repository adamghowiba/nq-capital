import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SendMessageInput } from '../../messages/dto/create-message.input';


@InputType()
export class SendTicketMessageInput
  extends SendMessageInput
  implements Prisma.MessageCreateWithoutTicketInput
{
  @Field(() => Number)
  ticket_id!: number;
}

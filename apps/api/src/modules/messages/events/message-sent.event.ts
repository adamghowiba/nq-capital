import { UserType } from '@prisma/client';

export class TicketMessageSentEvent {
  message!: string;
  ticketId!: number;
  senderType!: UserType;
  senderDisplayName!: string;
  created_at!: Date;

  constructor(data: TicketMessageSentEvent) {
    Object.assign(this, data);
  }
}

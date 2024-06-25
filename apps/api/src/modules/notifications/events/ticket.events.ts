import { UserType } from "@prisma/client";

export class SendTicketMessageEvent {
  static readonly commandName = 'ticket.message.sent';

  message!: string;
  ticketId!: number;
  senderType!: UserType;
  senderDisplayName!: string;
  created_at!: Date;

  constructor(data: Omit<SendTicketMessageEvent, 'commandName'>) {
    Object.assign(this, data);
  }
}

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApplicationSessionEntity } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { ApiError } from '../../common/exceptions/api.error';
import {
  NotificationEmitter,
} from '../notifications/notification-emitter.service';
import { NotificationsService } from '../notifications/notifications.service';
import { SendMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { MessageEvent } from './constants/message-event.constants';
import { TicketMessageSentEvent } from './events/message-sent.event';
import { SendTicketMessageEvent } from '../notifications/events/ticket.events';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationsService,
    private readonly eventEmitter: EventEmitter2,
    private readonly notificationEmitter: NotificationEmitter
  ) {}

  async create(
    createMessageInput: SendMessageInput,
    params: ApplicationSessionEntity
  ) {
    if (!params.user && !params.investor)
      throw new ApiError('Unable to determine sender');

    const message = await this.prisma.message.create({
      data: {
        ...createMessageInput,
        sent_by_investor_id:
          params.user_type === 'INVESTOR' && params.investor?.id
            ? params.investor.id
            : undefined,
        sent_by_user_id:
          params.user_type === 'ADMIN' && params.user?.id
            ? params.user.id
            : undefined,
      },
    });

    this.notificationEmitter.emit(
      new SendTicketMessageEvent({
        message: createMessageInput.content,
        senderType: params.user_type,
        created_at: new Date(),
        ticketId: createMessageInput.ticket_id || 0,
        senderDisplayName: (params.user_type === 'INVESTOR'
          ? params.investor?.first_name
          : params.user?.first_name) as string,
      })
    );

    // this.eventEmitter.emit(
    //   MessageEvent.MESSAGE_SENT,
    //   new TicketMessageSentEvent({
    //     message: createMessageInput.content,
    //     senderType: params.user_type,
    //     created_at: new Date(),
    //     ticketId: createMessageInput.ticket_id || 0,
    //     senderDisplayName: (params.user_type === 'INVESTOR'
    //       ? params.investor?.first_name
    //       : params.user?.first_name) as string,
    //   })
    // );

    return message;
  }

  async list() {
    const message = await this.prisma.message.findMany({
      orderBy: {
        created_at: 'asc',
      },
    });

    return message;
  }

  async retrieve(id: number) {
    const message = await this.prisma.message.findUnique({ where: { id } });

    return message;
  }

  async update(id: number, updateMessageInput: UpdateMessageInput) {
    const message = await this.prisma.message.update({
      data: updateMessageInput,
      where: { id },
    });

    return message;
  }

  async remove(id: number) {
    const message = await this.prisma.message.delete({ where: { id } });

    return message;
  }

  async getMessageSentByInvestorField(message_id: number) {
    return this.prisma.message
      .findUnique({
        where: { id: message_id },
      })
      .sent_by_investor();
  }

  async getMessageSentByUserField(message_id: number) {
    return this.prisma.message
      .findUnique({
        where: { id: message_id },
      })
      .sent_by_user();
  }

  async getAssetsField(message_id: number) {
    return this.prisma.message
      .findUnique({
        where: { id: message_id },
      })
      .assets();
  }
}

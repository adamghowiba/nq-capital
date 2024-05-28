import { Injectable } from '@nestjs/common';
import { ApplicationSessionEntity } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { padId } from '@nq-capital/utils';
import { NotificationsService } from '../notifications/notifications.service';
import { SendMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notification: NotificationsService
  ) {}

  async create(
    createMessageInput: SendMessageInput,
    params: ApplicationSessionEntity
  ) {
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

    const notification = await this.notification.send({
      title: `New message on ticket #${padId(message.ticket_id || 0)}`,
      content: message.content.slice(0, 100),
      channel: ['APP', 'EMAIL'],
      priority: 'HIGH',
    });

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

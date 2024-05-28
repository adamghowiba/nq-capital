import { Injectable } from '@nestjs/common';
import { SendNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PrismaService } from '@nq-capital/service-database';
import { PaginationArgs } from '../../common/dto/pagination.args';
import {
  NotificationEntity,
  PaginatedNotification,
} from './entities/notification.entity';
import { ApiError } from '../../common/exceptions/api.error';
import { EmailService } from '../../common/services/email/email.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService
  ) {}

  async send(createNotificationInput: SendNotificationInput): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.create({
      data: { ...createNotificationInput },
    });

    return notification
  }

  async list(params: PaginationArgs): Promise<PaginatedNotification> {
    const notifications = await this.prisma.notification.findMany({
      ...params.offset,
    });

    return {
      count: 0,
      hasNextPage: false,
      page: params.page,
      limit: params.limit,
      data: notifications,
    };
  }

  async retrieve(id: number): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification)
      throw new ApiError('Notification not found', { statusCode: 404 });

    return notification;
  }

  update(id: number, updateNotificationInput: UpdateNotificationInput) {
    return `This action updates a #${id} notification`;
  }

  async archive(id: number): Promise<NotificationEntity> {
    const notification = await this.prisma.notification.update({
      where: {
        id: id,
      },
      data: {
        is_archived: true,
        is_read: true,
      },
    });

    return notification;
  }
}

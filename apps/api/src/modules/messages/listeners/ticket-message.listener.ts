import { Injectable } from '@nestjs/common';
import { renderEmailTemplate } from '@nq-capital/email-templates';
import { padId } from '@nq-capital/utils';
import { INVESTORS_PORTAL_URL } from '@nq-capital/utils-constants';
import { DateTime } from 'luxon';
import { EmailService } from '../../../common/services/email/email.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { TicketMessageSentEvent } from '../events/message-sent.event';
import { OnEvent } from '@nestjs/event-emitter';
import { MessageEvent } from '../constants/message-event.constants';
import { PrismaService } from '@nq-capital/service-database';

@Injectable()
export class TicketMessageListener {
  constructor(
    private readonly notificationService: NotificationsService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService
  ) {}

  @OnEvent(MessageEvent.MESSAGE_SENT)
  async handleEmailNotification(payload: TicketMessageSentEvent) {
    if (payload.senderType === 'INVESTOR') return;

    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id: payload.ticketId,
      },
      select: {
        investor: {
          select: {
            first_name: true,
            email: true,
            last_name: true,
          },
        },
      },
    });

    if (!ticket) return;

    const notification = await this.notificationService.send({
      title: `New message on ticket #${padId(payload.ticketId)}`,
      content: payload.message.slice(0, 100),
      channel: ['EMAIL', 'APP'],
      priority: 'HIGH',
    });

    const ticketUrl = `${INVESTORS_PORTAL_URL.href}/tickets/${payload.ticketId}`;

    const template = renderEmailTemplate('ticketMessage', {
      senderDisplayName: payload.senderDisplayName,
      displayName: `${ticket.investor.first_name} ${ticket.investor.last_name}`,
      sentDateString: DateTime.fromJSDate(payload.created_at).toLocaleString(
        DateTime.DATETIME_MED
      ),
      ticketUrl: ticketUrl,
      message: payload.message,
      ticketId: padId(payload.ticketId),
    });

    this.emailService.sendEmail({
      subject: `New message on ticket #${padId(payload.ticketId)}`,
      destination: {
        toAddress: ticket.investor.email,
      },
      body: {
        html: template,
      },
    });

    return notification;
  }
}

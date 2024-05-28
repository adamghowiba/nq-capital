import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { NotificationsModule } from '../notifications/notifications.module';
import { TicketMessageListener } from './listeners/ticket-message.listener';
import { EmailModule } from '../../common/services/email/email.module';

@Module({
  imports: [NotificationsModule, EmailModule],
  providers: [MessagesResolver, MessagesService, TicketMessageListener],
  exports: [MessagesService],
})
export class MessagesModule {}

import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { EmailModule } from '../../common/services/email/email.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotificationEmitter } from './notification-emitter.service';

@Module({
  imports: [EmailModule],
  providers: [NotificationsResolver, NotificationsService, EventEmitter2, NotificationEmitter],
  exports: [NotificationsService]
})
export class NotificationsModule {}

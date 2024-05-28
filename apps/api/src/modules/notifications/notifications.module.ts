import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { EmailModule } from '../../common/services/email/email.module';

@Module({
  imports: [EmailModule],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService]
})
export class NotificationsModule {}

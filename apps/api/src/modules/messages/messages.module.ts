import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { StorageService } from '../../common/services/storage/storage.service';
import { StorageModule } from '../../common/services/storage/storage.module';

@Module({
  imports: [StorageModule],
  providers: [MessagesResolver, MessagesService, StorageService],
  exports: [MessagesService],
})
export class MessagesModule {}

import { Module } from '@nestjs/common';
import { AssetsModule } from '../assets/assets.module';
import { MessagesModule } from '../messages/messages.module';
import { TicketsController } from './tickets.controller';
import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';

@Module({
  imports: [MessagesModule, AssetsModule],
  controllers: [TicketsController],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}

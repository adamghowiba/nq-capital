import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController, TicketsResolver } from './tickets.resolver';
import { MessagesModule } from '../messages/messages.module';

@Module({
  imports: [MessagesModule],
  controllers: [TicketsController],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}

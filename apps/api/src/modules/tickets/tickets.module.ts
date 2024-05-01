import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { MessagesModule } from '../messages/messages.module';
import { TicketsController } from './tickets.controller';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [MessagesModule, AssetsModule],
  controllers: [TicketsController],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}

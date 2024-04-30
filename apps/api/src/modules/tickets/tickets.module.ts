import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController, TicketsResolver } from './tickets.resolver';

@Module({
  controllers: [TicketsController],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}

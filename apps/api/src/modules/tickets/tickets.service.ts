import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from '@nq-capital/service-database';
import { ApiError } from '../../common/exceptions/api.error';
import { CreateTicketMessageInput } from './dto/create-ticket-message.input';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketInput: CreateTicketInput) {
    if (!createTicketInput.investor_id)
      throw new ApiError('Investor ID is required');

    const ticket = await this.prisma.ticket.create({
      data: createTicketInput,
    });

    return ticket;
  }

  async message(tickerMessageInput: CreateTicketMessageInput & {}) {
    const ticketMessage = await this.prisma.message.create({
      data: { ...tickerMessageInput },
    });

    return ticketMessage;
  }

  async list() {
    const ticket = await this.prisma.ticket.findMany({});

    return ticket;
  }

  async retrieve(id: number) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });

    return ticket;
  }

  async update(id: number, updateTicketInput: UpdateTicketInput) {
    const ticket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketInput,
    });

    return ticket;
  }

  async remove(id: number) {
    const ticket = await this.prisma.ticket.delete({ where: { id } });

    return ticket;
  }
}

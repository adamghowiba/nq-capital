import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  GqlSession,
  InvestorSession,
} from '../../common/decorators/auth/session.decorator';
import {
  ApplicationSessionEntity
} from '../auth/entities/session.entity';
import { InvestorEntity } from '../investors/entities/investor.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { SendTicketMessageInput } from './dto/create-ticket-message.input';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { TicketEntity } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';

@Resolver(() => TicketEntity)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => TicketEntity)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
    @InvestorSession() investorSession: InvestorEntity
  ) {
    return this.ticketsService.create({
      ...createTicketInput,
      investor_id: investorSession?.id,
    });
  }

  @Mutation(() => MessageEntity, { name: 'sendTicketMessage' })
  sendMessage(
    @Args('sendTicketMessageInput')
    sendTickerMessageInput: SendTicketMessageInput,
    @GqlSession() session: ApplicationSessionEntity
  ) {
    return this.ticketsService.message(
      {
        ...sendTickerMessageInput,
      },
      session
    );
  }

  @Query(() => [TicketEntity], { name: 'tickets' })
  list() {
    return this.ticketsService.list();
  }

  @Query(() => TicketEntity, { name: 'ticket' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.retrieve(id);
  }

  @Mutation(() => TicketEntity)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput
  ) {
    return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => TicketEntity)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.remove(id);
  }

  @ResolveField('messages', () => [MessageEntity])
  getMessagesField(@Parent() ticket: TicketEntity) {
    return this.ticketsService.getTickerMessagesField(ticket);
  }
}

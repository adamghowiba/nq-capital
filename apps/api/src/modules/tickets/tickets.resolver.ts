import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { TicketEntity } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import {
  GqlSession,
  InvestorSession,
} from '../../common/decorators/auth/gql-user.decorator';
import { InvestorEntity } from '../investors/entities/investor.entity';
import { SendTicketMessageInput } from './dto/create-ticket-message.input';
import {
  ApplicationSessionEntity,
  SessionEntity,
} from '../auth/entities/session.entity';
import { MessageEntity } from './entities/message.entity';

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

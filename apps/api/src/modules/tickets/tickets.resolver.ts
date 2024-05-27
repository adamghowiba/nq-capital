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
import { MessageEntity } from '../messages/entities/message.entity';
import { SendTicketMessageInput } from './dto/create-ticket-message.input';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { TicketEntity } from './entities/ticket.entity';
import { TicketsService } from './tickets.service';
import { ApplicationSessionEntity, InvestorEntity } from '@nq-capital/iam';
import { AssetEntity } from '../assets/entities/asset.entity';
import { PrismaService } from '@nq-capital/service-database';
import { GraphQLJSONObject } from 'graphql-type-json';

@Resolver(() => TicketEntity)
export class TicketsResolver {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly prisma: PrismaService
  ) {}

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

  @ResolveField('assets', () => [AssetEntity], { nullable: true })
  async getAssetsField(@Parent() ticket: TicketEntity) {
    const asset = await this.prisma.ticket
      .findUnique({ where: { id: ticket.id } })
      .messages({
        select: {
          assets: true,
        },
      });

    return asset?.filter(Boolean).flatMap((asset) => asset.assets);
  }
}

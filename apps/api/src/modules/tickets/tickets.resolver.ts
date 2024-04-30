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
import { MessageEntity } from '../messages/entities/message.entity';
import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Multer } from 'multer';
import { MessagesService } from '../messages/messages.service';

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

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly messageService: MessagesService
  ) {}

  @UseInterceptors(FilesInterceptor('files', 4))
  @Post('messages/:id/upload')
  async attachFileToMessage(
    @Param('id', ParseIntPipe) messageId: number,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    const firstFile = files[0];

    const data = await this.messageService.attachFile({
      message_id: 1,
      file: {
        body: firstFile.buffer,
        fileName: firstFile.originalname,
        contentType: firstFile.mimetype,
        metaData: {
          test: 'Some test value',
          date: '2021-10-10',
        },
        key: 'assets',
      },
    });

    return data;
  }
}

import { Injectable } from '@nestjs/common';
import { ApplicationSessionEntity } from '@nq-capital/iam';
import { PrismaService } from '@nq-capital/service-database';
import { ApiError } from '../../common/exceptions/api.error';
import { AssetsService } from '../assets/assets.service';
import { MulterFile } from '../assets/entities/multer-file.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { MessagesService } from '../messages/messages.service';
import { SendTicketMessageInput } from './dto/create-ticket-message.input';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { UploadTicketFileDto } from './dto/upload-ticket-file.dto';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly assetService: AssetsService,
    private readonly messageService: MessagesService
  ) {}

  async create(createTicketInput: CreateTicketInput) {
    if (!createTicketInput.investor_id)
      throw new ApiError('Investor ID is required');

    const ticket = await this.prisma.ticket.create({
      data: createTicketInput,
    });

    return ticket;
  }

  async message(
    sendMessageInput: SendTicketMessageInput,
    params: ApplicationSessionEntity
  ): Promise<MessageEntity> {
    const ticketMessage = await this.messageService.create(
      {
        ...sendMessageInput,
        type: params.user_type,
      },
      params
    );

    return ticketMessage;
  }

  async uploadFile(
    attachFileDto: UploadTicketFileDto & {
      files: MulterFile[];
      ticket_id: number;
      investor_id?: number;
      user_id?: number;
    }
  ) {
    const { files, ...rest } = attachFileDto;

    const upload = await this.assetService.batchUpload(
      files.map((file) => {
        return {
          body: file.buffer,
          file_name: file.originalname,
          mime_type: file.mimetype,
          size: file.size,
          meta_data: {
            ticket_id: String(attachFileDto.ticket_id),
            message_id: String(attachFileDto.message_id),
          },
          ...rest,
        };
      })
    );

    return upload;
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

  getTickerMessagesField(ticket: TicketEntity) {
    return this.prisma.ticket
      .findUnique({ where: { id: ticket.id } })
      .messages({ orderBy: { created_at: 'asc' } });
  }
}

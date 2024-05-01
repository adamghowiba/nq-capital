import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from '@nq-capital/service-database';
import { ApiError } from '../../common/exceptions/api.error';
import { SendTicketMessageInput } from './dto/create-ticket-message.input';
import {
  ApplicationSessionEntity,
  SessionEntity,
} from '../auth/entities/session.entity';
import { TicketEntity } from './entities/ticket.entity';
import { UploadTicketFileDto } from './dto/upload-ticket-file.dto';
import { AssetsService } from '../assets/assets.service';
import { FileBody, UploadAssetDto } from '../assets/dto/upload-asset.dto';
import { MulterFile } from '../assets/entities/multer-file.entity';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly assetService: AssetsService
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
  ) {
    const ticketMessage = await this.prisma.message.create({
      data: {
        ...sendMessageInput,
        sent_by_investor_id:
          params.application === 'investors_portal' && params.investor?.id
            ? params.investor.id
            : undefined,
        sent_by_user_id:
          params.application === 'admin_portal' && params.user?.id
            ? params.user.id
            : undefined,
      },
    });

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
    const {files, ...rest} = attachFileDto;

    const upload = await this.assetService.batchUpload(
      files.map((file) => {
        return {
          body: file.buffer,
          file_name: file.originalname,
          mime_type: file.mimetype,
          meta_data: {
            ticket_id: String(attachFileDto.ticket_id),
            message_id: String(attachFileDto.message_id),
          },
          ...rest
        };
      })
    );

    // TODO Assets field on ticket itself
    // const ticket = await this.prisma.ticket.update({
    //   where: { id: attachFileDto.ticket_id },
    //   data: {},
    // });

    // if (attachFileDto.message_id) {
    //   const message = await this.prisma.message.update({
    //     where: {
    //       id: attachFileDto.message_id,
    //     },
    //     data: {
    //       assets: {
    //         connect: {
    //           id: upload.asset.id,
    //         },
    //       },
    //     },
    //   });
    // }

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
      .messages();
  }
}

import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterFile } from '../assets/entities/multer-file.entity';
import { MessagesService } from '../messages/messages.service';
import { TicketsService } from './tickets.service';
import { UploadTicketFileDto } from './dto/upload-ticket-file.dto';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly messageService: MessagesService
  ) {}

  @UseInterceptors(FilesInterceptor('files', 4))
  @Post(':ticket_id/upload')
  async uploadFile(
    @Param('ticket_id', ParseIntPipe) ticketId: number,
    @Body() body: UploadTicketFileDto,
    @UploadedFiles() files: Array<MulterFile>
  ) {
    return this.ticketsService.uploadFile({
      ticket_id: ticketId,
      message_id: body?.message_id,
      files: files,
    })
  }
}

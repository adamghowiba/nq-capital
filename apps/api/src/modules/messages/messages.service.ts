import { Injectable } from '@nestjs/common';
import { UpdateMessageInput } from './dto/update-message.input';
import { PrismaService } from '@nq-capital/service-database';
import { SendMessageInput } from './dto/create-message.input';
import {
  StorageService,
  UploadFileInput,
} from '../../common/services/storage/storage.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService
  ) {}

  async create(createMessageInput: SendMessageInput) {
    const message = await this.prisma.message.create({
      data: createMessageInput,
    });

    return message;
  }

  async attachFile(attachFileInput: {
    message_id: number;
    file: UploadFileInput;
  }) {
    const data = await this.storageService.uploadFile({
      ...attachFileInput.file,
    });

    const message = await this.prisma.message.update({
      where: {
        id: attachFileInput.message_id,
      },
      data: {
        edit_count: {
          increment: 0,
        },
      },
    });

    return data;
  }

  async list() {
    const message = await this.prisma.message.findMany();

    return message;
  }

  async retrieve(id: number) {
    const message = await this.prisma.message.findUnique({ where: { id } });

    return message;
  }

  async update(id: number, updateMessageInput: UpdateMessageInput) {
    const message = await this.prisma.message.update({
      data: updateMessageInput,
      where: { id },
    });

    return message;
  }

  async remove(id: number) {
    const message = await this.prisma.message.delete({ where: { id } });

    return message;
  }

  async getMessageSentByInvestorField(message_id: number) {
    return this.prisma.message
      .findUnique({
        where: { id: message_id },
      })
      .sent_by_investor();
  }

  async getMessageSentByUserField(message_id: number) {
    return this.prisma.message
      .findUnique({
        where: { id: message_id },
      })
      .sent_by_user();
  }
}

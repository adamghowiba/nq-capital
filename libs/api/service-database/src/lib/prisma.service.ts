import { Prisma, PrismaClient } from '@prisma/client';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private logger = new Logger(PrismaService.name);

  constructor() {
    super({});
  }

  async onModuleInit() {
    await this.$connect();

    if (
      process.env['NODE_ENV'] != 'production' &&
      !process.env['DATABASE_URL']?.includes('localhost')
    ) {
      this.logger.warn(
        `CONNECTING TO NON-LOCAL DATABASE: ${process.env?.['DATABASE_URL']}. BE CAREFUL!`
      );
    }

    this.logger.log(
      `Connected to the database on host ${process.env?.['DATABASE_URL']}`
    );
  }
}

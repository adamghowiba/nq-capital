import { Injectable } from '@nestjs/common';
import { S3StorageService } from './s3.service';
import { Readable } from 'stream';
import { IsMimeType, IsObject, IsOptional, IsString } from 'class-validator';
import { PrismaService } from '@nq-capital/service-database';

export class UploadFileInput {
  @IsString()
  fileName!: string;

  body!: Buffer | Uint8Array | Blob | string | Readable;

  @IsMimeType()
  contentType?: string;

  @IsObject()
  metaData?: Record<string, string>;

  @IsString()
  key!: string;
}

@Injectable()
export class StorageService {
  private storage;

  constructor(private readonly prisma: PrismaService) {
    this.storage = new S3StorageService();
  }

  async uploadFile(args: UploadFileInput) {
    const file = await this.storage.uploadFile({
      body: args.body,
      key: args.key,
      fileName: args.fileName,
      metaData: args.metaData,
      contentType: args.contentType,
    });

    // const asset = await this.prisma.asset.create({
    //   data: {
    //     mime_type: args.contentType || 'unknown',
    //     url: 'https://nqcapital.s3.amazonaws.com/' + args.key,
    //     asset_type: 'UNKNOWN',
    //   },
    // });

    // return { file, asset };
  }
}

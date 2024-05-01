import { OmitType } from '@nestjs/graphql';
import { $Enums, Prisma } from '@prisma/client';
import {
  IsMimeType,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Readable } from 'stream';

export type FileBody = Buffer | Uint8Array | Blob | string | Readable;

export class UploadAssetDto {
  /**
   * Original name of the file
   */
  @IsString()
  file_name!: string;

  /**
   * The directory where the file will be stored
   */
  @IsString()
  directory?: string;

  body!: Buffer | Uint8Array | Blob | string | Readable;

  @IsMimeType()
  mime_type!: string;

  @IsObject()
  @IsOptional()
  meta_data?: Record<string, string>;

  @IsNumber()
  @IsOptional()
  user_id?: number | null | undefined;

  @IsNumber()
  @IsOptional()
  investor_id?: number | null | undefined;

  @IsNumber()
  @IsOptional()
  message_id?: number | null | undefined;
}

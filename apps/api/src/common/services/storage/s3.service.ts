import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

export interface UploadFileOutput {
  key: string;
  url: string;
}

@Injectable()
export class S3StorageService {
  private client: S3Client;
  public bucketName: string;

  constructor() {
    this.bucketName = 'nqcapital';

    this.client = new S3Client({ region: 'us-east-1' });
  }

  async uploadFile(params: {
    fileName: string;
    body: Buffer | Uint8Array | Blob | string | Readable;
    contentType?: string;
    metaData?: Record<string, string>;
    key: string | string[];
  }): Promise<UploadFileOutput> {
    const key = Array.isArray(params.key)
      ? this.createS3Key(params.key)
      : params.key;

    const response = await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: params.body,
        Metadata: params.metaData,
        ContentType: params.contentType,
      })
    );

    return { key: key, url: this.getAssetUrl(key) };
  }

  async delete(params: { key: string }) {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: params.key,
    });

    const response = await this.client.send(deleteCommand);

    return response;
  }

  getAssetUrl(key: string) {
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
  }

  createS3Key(parts: (string | undefined)[]): string {
    const validParts = parts.filter(
      (part) => part !== undefined && part.trim() !== ''
    );

    // Join the valid parts with a forward slash, ensuring no double slashes
    const key = validParts
      .map((part) => part!.trim().replace(/^\/+|\/+$/g, ''))
      .join('/');

    return key;
  }
}

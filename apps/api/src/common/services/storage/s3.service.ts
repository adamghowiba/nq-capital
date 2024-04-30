import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export class S3StorageService {
  private client: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = 'nqcapital';

    this.client = new S3Client({ region: 'us-east-1' });
  }

  async uploadFile(params: {
    fileName: string;
    body: Buffer | Uint8Array | Blob | string | Readable;
    contentType?: string;
    metaData?: Record<string, string>;
    key: string;
  }) {
    const response = await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: params.key,
        Body: params.body,
        Metadata: params.metaData,
        ContentType: params.contentType,
      })
    );

    return response;
  }
}

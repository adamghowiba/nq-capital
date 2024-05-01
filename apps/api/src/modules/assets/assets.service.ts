import { Injectable } from '@nestjs/common';
import { UploadAssetDto } from './dto/upload-asset.dto';
import { UpdateAssetInput } from './dto/update-asset.input';
import { PrismaService } from '@nq-capital/service-database';
import { S3StorageService } from '../../common/services/storage/s3.service';
import { ApiError } from '../../common/exceptions/api.error';
import { v4 as uuidV4 } from 'uuid';
import path from 'path';
import { Prisma } from '@prisma/client';
import { getFileType, omit } from '@nq-capital/utils';
import {
  AssetEntity,
  BatchUploadEntity,
  FailedUploadOutput,
  SuccessfulUploadOutput,
} from './entities/asset.entity';
import { ObjectNotInActiveTierError } from '@aws-sdk/client-s3';

@Injectable()
export class AssetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: S3StorageService
  ) {}

  async upload(createAssetInput: UploadAssetDto) {
    const storage = await this._upload(createAssetInput);

    const asset = await this.prisma.asset.create({
      data: {
        key: storage.key,
        url: storage.url,
        mime_type: createAssetInput.mime_type,
        original_name: createAssetInput.file_name,
        asset_type: getFileType(createAssetInput.mime_type),
      },
    });

    return { asset, storage };
  }

  async batchUpload(
    createAssetInputs: UploadAssetDto[]
  ): Promise<BatchUploadEntity> {
    const assets = await Promise.allSettled(
      createAssetInputs.map((createAssetInput, index) =>
        this._upload(createAssetInput)
      )
    );

    const assetResults = assets.reduce(
      (
        acc: {
          successful: SuccessfulUploadOutput[];
          failed: FailedUploadOutput[];
        },
        result,
        index
      ) => {
        const assetInput = omit(createAssetInputs[index], ['body']);

        if (result.status === 'rejected') {
          acc.failed.push(assetInput);
        }

        if (result.status === 'fulfilled') {
          acc.successful.push({
            ...assetInput,
            key: result.value.key,
            url: result.value.url,
          });
        }

        return acc;
      },
      { successful: [], failed: [] }
    );

    await this.prisma.asset.createMany({
      data: assetResults.successful.map((asset) => {
        return {
          key: asset.key,
          mime_type: asset.mime_type,
          original_name: asset.file_name,
          investor_id: asset.investor_id,
          message_id: asset.message_id,
          user_id: asset.user_id,
          url: asset.url,
          asset_type: getFileType(asset.mime_type),
        };
      }),
    });

    return {
      failed_uploads: assetResults.failed,
      successful_uploads: assetResults.successful,
    };
  }

  /**
   * Internal function which upload's to a given storage provider
   */
  private async _upload(createAssetInput: UploadAssetDto) {
    const uuid = uuidV4();

    // Prefix the directory with the user or investor id
    const directoryPrefix = this.getProfileDirectory(createAssetInput);
    const key = this.createS3Key([
      directoryPrefix,
      createAssetInput.directory,
      uuid,
    ]);

    const storage = await this.storage.uploadFile({
      body: createAssetInput.body,
      fileName: createAssetInput.file_name,
      key: key,
      contentType: createAssetInput.mime_type,
      metaData: createAssetInput.meta_data,
    });

    return storage;
  }

  async list(): Promise<AssetEntity[]> {
    const assets = await this.prisma.asset.findMany();

    return assets;
  }

  async retrieve(id: number) {
    const assets = await this.prisma.asset.findUnique({ where: { id } });

    return assets;
  }

  async remove(id: number): Promise<AssetEntity> {
    const asset = await this.prisma.asset.findUnique({ where: { id } });

    if (!asset) throw new ApiError('Asset not found', { statusCode: 404 });

    const deleted = await this.storage.delete({ key: asset.key });
    const deletedAsset = await this.prisma.asset.delete({ where: { id } });

    return deletedAsset;
  }

  private getProfileDirectory(createAssetInput: UploadAssetDto) {
    if (createAssetInput.user_id) {
      return `users/${createAssetInput.user_id}`;
    }

    if (createAssetInput.investor_id) {
      return `investors/${createAssetInput.investor_id}`;
    }

    return undefined;
  }

  private createS3Key(parts: (string | undefined)[]): string {
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

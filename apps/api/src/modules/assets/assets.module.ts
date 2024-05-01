import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsResolver } from './assets.resolver';
import { S3StorageService } from '../../common/services/storage/s3.service';
import { AssetsController } from './assets.controller';

@Module({
  controllers: [AssetsController],
  providers: [AssetsResolver, AssetsService, S3StorageService],
  exports: [AssetsService],
})
export class AssetsModule {}

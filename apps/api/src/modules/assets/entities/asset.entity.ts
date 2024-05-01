import {
  Field,
  GraphQLISODateTime,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Asset, AssetType } from '@prisma/client';
import { isArray } from 'class-validator';
import { UploadAssetDto } from '../dto/upload-asset.dto';

registerEnumType(AssetType, {
  name: 'AssetType',
});

@ObjectType()
export class AssetEntity implements Asset {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  original_name!: string;

  @Field(() => String)
  key!: string;

  @Field(() => String)
  url!: string;

  @Field(() => String)
  mime_type!: string;

  @Field(() => AssetType)
  asset_type!: AssetType;

  @Field(() => Int, { nullable: true })
  user_id!: number | null;

  @Field(() => Int, { nullable: true })
  investor_id!: number | null;

  @Field(() => Int, { nullable: true })
  message_id!: number | null;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

export interface SuccessfulUploadOutput extends Omit<UploadAssetDto, 'body'> {
  key: string;
  url: string;
}

export type FailedUploadOutput = Omit<UploadAssetDto, 'body'>;

export class BatchUploadEntity {
  successful_uploads!: SuccessfulUploadOutput[];
  failed_uploads!: FailedUploadOutput[];
}

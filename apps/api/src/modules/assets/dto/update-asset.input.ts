import { Field, InputType, Int } from '@nestjs/graphql';
import { AssetType, Prisma } from '@prisma/client';

@InputType()
export class UpdateAssetInput implements Prisma.AssetUncheckedUpdateInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  original_name?: string;

  @Field(() => String, { nullable: true })
  key?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  mime_type?: string;

  @Field(() => AssetType, { nullable: true })
  asset_type?: AssetType;

  @Field(() => Int, { nullable: true })
  user_id?: number | null;

  @Field(() => Int, { nullable: true })
  investor_id?: number | null;

  @Field(() => Int, { nullable: true })
  message_id?: number | null;
}

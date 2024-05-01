import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { UpdateAssetInput } from './dto/update-asset.input';
import { AssetEntity } from './entities/asset.entity';

@Resolver(() => AssetEntity)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [AssetEntity], { name: 'assets' })
  list() {
    return this.assetsService.list();
  }

  @Query(() => AssetEntity, { name: 'asset' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.assetsService.retrieve(id);
  }


  @Mutation(() => AssetEntity)
  removeAsset(@Args('id', { type: () => Int }) id: number) {
    return this.assetsService.remove(id);
  }
}

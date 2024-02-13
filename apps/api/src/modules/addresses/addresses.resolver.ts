import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { AddressEntity } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver(() => AddressEntity)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => AddressEntity)
  createAddress(
    @Args('createAddressInput') createAddressInput: CreateAddressInput
  ) {
    return this.addressesService.create(createAddressInput);
  }

  @Query(() => [AddressEntity], { name: 'addresses' })
  findAll() {
    return this.addressesService.findAll();
  }

  @Query(() => AddressEntity, { name: 'address' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.addressesService.findOne(id);
  }

  @Mutation(() => AddressEntity)
  updateAddress(
    @Args('updateAddressInput') updateAddressInput: UpdateAddressInput
  ) {
    return this.addressesService.update(
      updateAddressInput.id,
      updateAddressInput
    );
  }

  @Mutation(() => AddressEntity)
  removeAddress(@Args('id', { type: () => Int }) id: number) {
    return this.addressesService.remove(id);
  }
}

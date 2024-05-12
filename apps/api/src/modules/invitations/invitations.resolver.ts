import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvitationsService } from './invitations.service';
import { InvitationEntity } from './entities/invitation.entity';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { ApiError } from '../../common/exceptions/api.error';

@Resolver(() => InvitationEntity)
export class InvitationsResolver {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Mutation(() => InvitationEntity)
  inviteInvestor(
    @Args('invitationInput') invitationInput: CreateInvitationInput
  ) {
    return this.invitationsService.inviteInvestor(invitationInput);
  }

  @Mutation(() => InvitationEntity)
  inviteUser(@Args('invitationInput') invitationInput: CreateInvitationInput) {
    throw new ApiError('Unimplemented', { statusCode: 501 });
  }

  @Query(() => [InvitationEntity], { name: 'invitations' })
  list() {
    return this.invitationsService.list();
  }

  @Query(() => InvitationEntity, { name: 'invitation' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
    return this.invitationsService.retrieve(id);
  }

  @Mutation(() => InvitationEntity)
  updateInvitation(
    @Args('updateInvitationInput') updateInvitationInput: UpdateInvitationInput
  ) {
    return this.invitationsService.update(
      updateInvitationInput.id,
      updateInvitationInput
    );
  }

  @Mutation(() => InvitationEntity)
  removeInvitation(@Args('id', { type: () => Int }) id: number) {
    return this.invitationsService.remove(id);
  }
}

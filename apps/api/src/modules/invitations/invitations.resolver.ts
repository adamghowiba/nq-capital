import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InvitationsService } from './invitations.service';
import { InvitationEntity } from './entities/invitation.entity';
import { CreateInvitationInput } from './dto/create-invitation.input';
import { UpdateInvitationInput } from './dto/update-invitation.input';
import { ApiError } from '../../common/exceptions/api.error';
import { UserSession } from '../../common/decorators/auth/session.decorator';
import { ListInvitationArgs } from './dto/get-invitations.input';
import { InvestorEntity, UserEntity } from '@nq-capital/iam';
import { AcceptInvestorInvitationInput } from './dto/accept-invitation.input';

@Resolver(() => InvitationEntity)
export class InvitationsResolver {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Mutation(() => InvitationEntity)
  inviteInvestor(
    @Args('invitationInput') invitationInput: CreateInvitationInput,
    @UserSession() userSession: UserEntity
  ) {
    return this.invitationsService.inviteInvestor({
      ...invitationInput,
      invited_by_user_id: 1,
    });
  }

  @Mutation(() => InvestorEntity, { name: 'acceptInvestorInvitation' })
  acceptInvitation(
    @Args('acceptInvestorInvitationInput')
    createInvestorInput: AcceptInvestorInvitationInput
  ) {
    return this.invitationsService.acceptInvestorInvitation(
      createInvestorInput
    );
  }

  @Mutation(() => InvitationEntity)
  inviteUser(@Args('invitationInput') invitationInput: CreateInvitationInput) {
    throw new ApiError('Unimplemented', { statusCode: 501 });
  }

  @Query(() => [InvitationEntity], { name: 'invitations' })
  list(@Args() args: ListInvitationArgs) {
    return this.invitationsService.list(args);
  }

  @Query(() => InvitationEntity, { name: 'invitation' })
  retrieve(@Args('code', { type: () => String }) id: string) {
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

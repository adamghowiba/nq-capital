import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsResolver } from './invitations.resolver';
import { EmailModule } from '../../common/services/email/email.module';
import { InvitationListener } from './listeners/invitation.listener';

@Module({
  imports: [EmailModule],
  providers: [InvitationsResolver, InvitationsService, InvitationListener],
})
export class InvitationsModule {}

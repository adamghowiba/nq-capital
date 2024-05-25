import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsResolver } from './invitations.resolver';
import { EmailModule } from '../../common/services/email/email.module';
import { InvitationListener } from './listeners/invitation.listener';
import { InvestorsModule } from '../investors/investors.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [EmailModule, InvestorsModule, UsersModule],
  providers: [InvitationsResolver, InvitationsService, InvitationListener],
})
export class InvitationsModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session/session.serializer';
import { InvestorsModule } from '../investors/investors.module';
import { PasswordResetListener } from './listeners/password-reset.listener';
import { EmailModule } from '../../common/services/email/email.module';

@Module({
  imports: [UsersModule, InvestorsModule, EmailModule],
  providers: [AuthResolver, AuthService, SessionSerializer, LocalStrategy, PasswordResetListener],
})
export class AuthModule {}

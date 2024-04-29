import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session/session.serializer';
import { InvestorsModule } from '../investors/investors.module';

@Module({
  imports: [UsersModule, InvestorsModule],
  providers: [AuthResolver, AuthService, SessionSerializer, LocalStrategy],
})
export class AuthModule {}

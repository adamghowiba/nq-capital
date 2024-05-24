import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GqlSession,
  InvestorSession,
  UserSession,
} from '../../common/decorators/auth/session.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LogoutEntity } from './entities/logout.entity';
import { GqlAuthGuard } from './guards/graphql-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { InvestorEntity } from '../investors/entities/investor.entity';
import { SessionEntity } from './entities/session.entity';
import { Request } from 'express';

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => UserEntity)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.login(loginInput);

    return user;
  }

  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => InvestorEntity)
  async investorLogin(@Args('loginInput') loginInput: LoginInput) {
    const investor = await this.authService.loginInvestor(loginInput);

    return investor;
  }

  @Mutation(() => LogoutEntity)
  async logout(@Context('req') request: Request) {
    request.session.destroy(console.error);

    return { status: 'Success' };
  }

  @Query(() => SessionEntity)
  async me(@GqlSession() session: SessionEntity) {
    if (!session) throw new UnauthorizedException(`You're not logged in.`);

    return session;
  }

  @Query(() => InvestorEntity)
  async meInvestor(@InvestorSession() investor: InvestorEntity) {
    if (!investor)
      throw new UnauthorizedException(
        `You're not logged in to any investor accounts`
      );

    return investor;
  }

  @Query(() => UserEntity)
  async meUser(@UserSession() user: UserEntity) {
    if (!user)
      throw new UnauthorizedException(
        `You're not logged in to an admin account.`
      );

    return user;
  }
}

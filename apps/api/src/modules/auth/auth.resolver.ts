import {
  Logger,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GqlSession,
  InvestorSession,
  UserSession,
} from '../../common/decorators/auth/session.decorator';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { LogoutEntity } from './entities/logout.entity';
import { GqlAuthGuard } from './guards/graphql-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request, Response as ExpressResponse } from 'express';
import { InvestorEntity, SessionEntity, UserEntity } from '@nq-capital/iam';

@Resolver(() => UserEntity)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => UserEntity)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.login(loginInput);

    return user;
  }

  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => UserEntity)
  async adminLogin(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.loginAdmin(loginInput);

    return user;
  }

  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => InvestorEntity)
  async investorLogin(@Args('loginInput') loginInput: LoginInput) {
    const investor = await this.authService.loginInvestor(loginInput);

    return investor;
  }

  @Mutation(() => LogoutEntity, { nullable: true })
  async logout(
    @Context('req') request: Request,
    @Context('res') response: ExpressResponse
  ) {
    request.session.destroy((err) => {
      if (err) this.logger.error('Something went wrong');
    });
    response.clearCookie('connect.sid', { path: '/' });

    return { status: 'success' };
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

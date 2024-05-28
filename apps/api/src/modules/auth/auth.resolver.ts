import {
  HttpStatus,
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
import {
  ApplicationSessionEntity,
  InvestorEntity,
  SessionEntity,
  UserEntity,
} from '@nq-capital/iam';
import { ApiError } from '../../common/exceptions/api.error';
import { RequestPasswordResetInput } from './dto/request-password-reset.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ValidatePasswordResetTokenInput } from './dto/validate-reset-token.input';
import { ValidatePasswordResetTokenEntity } from './entities/validate-password-reset-token.entity';
import { ProfileEntity } from './entities/profile.entity';

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
    @Context('res') response: ExpressResponse,
    @GqlSession() session: ApplicationSessionEntity
  ) {
    if (!session)
      throw new ApiError("You're not logged in.", {
        statusCode: HttpStatus.UNAUTHORIZED,
      });

    if (
      (session.user_type === 'INVESTOR' && !request.user.user) ||
      (session.user_type === 'ADMIN' && !request.user.investor)
    ) {
      request.session.destroy((err) => {
        if (err) this.logger.error('Something went wrong');
      });
      response.clearCookie('connect.sid', { path: '/' });

      return { status: 'success' };
    }

    if (session.user_type === 'ADMIN') {
      // @ts-expect-error Doesn't inherit passport session type
      request.session.passport.user.userId = null;
    }

    if (session.user_type === 'INVESTOR') {
      // @ts-expect-error Doesn't inherit passport session type
      request.session.passport.user.investorId = null;
    }

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

  @Mutation(() => ProfileEntity)
  async requestPasswordReset(
    @Args('requestPasswordResetInput') requestPasswordResetInput: RequestPasswordResetInput,
    @GqlSession() session: ApplicationSessionEntity
  ) {
    const user = await this.authService.requestPasswordReset(requestPasswordResetInput, session)

    return user
  }

  @Mutation(() => ProfileEntity)
  async resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput) {
    const profile = await this.authService.resetPasswordWithToken(resetPasswordInput)

    return profile
  }

  @Mutation(() => ValidatePasswordResetTokenEntity)
  async validatePasswordResetToken(
    @Args('validatePasswordResetTokenInput')
    validatePasswordResetTokenInput: ValidatePasswordResetTokenInput
  ) {
    const result = await this.authService.validatePasswordResetToken(
      validatePasswordResetTokenInput
    )

    return result
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { compare } from 'bcrypt';
import { ApiError } from '../../common/exceptions/api.error';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { PrismaService } from '@nq-capital/service-database';
import { SerializeSessionPayload } from './session/session.serializer';
import {
  Application,
  ApplicationSessionEntity,
  InvestorEntity,
  UserEntity,
} from '@nq-capital/iam';
import { RequestPasswordResetInput } from './dto/request-password-reset.input';
import { randomBytes } from 'crypto';
import { DateTime } from 'luxon';
import { AUTH_EVENTS } from './constants/event.constants';
import { RequestPasswordResetEvent } from './events/request-password-reset.event';
import { ValidatePasswordResetTokenInput } from './dto/validate-reset-token.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { UserType } from '@prisma/client';
import { ProfileEntity } from './entities/profile.entity';
import { InvestorsService } from '../investors/investors.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2,
    private readonly investorService: InvestorsService
  ) {}

  async loginAdmin(loginInput: Omit<LoginInput, 'user_type'>) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
    });

    if (!user)
      throw new ApiError(`User ${loginInput.email} not found`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      });

    const matchingPassword = await compare(loginInput.password, user.password);

    if (!matchingPassword)
      throw new ApiError(`Invalid password please try again`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      });

    return user;
  }

  async loginInvestor(loginInput: Omit<LoginInput, 'user_type'>) {
    const loginResponse = await this.login({
      ...loginInput,
      user_type: 'INVESTOR',
    });

    if (loginResponse.type !== 'INVESTOR')
      throw new ApiError('Attempted non-investor login', { statusCode: 500 });

    return loginResponse.investor;
  }

  /**
   * Shared login method for both investors and admins
   */
  async login(loginInput: LoginInput): Promise<SerializeSessionPayload> {
    const userType = loginInput.user_type;
    const userTypeModel = userType === 'ADMIN' ? 'user' : 'investor';

    const profile =
      userType === 'ADMIN'
        ? await this.prisma.user.findUnique({
            where: { email: loginInput.email },
          })
        : await this.prisma.investor.findUnique({
            where: { email: loginInput.email },
          });

    if (!profile)
      throw new ApiError(`${userTypeModel} ${loginInput.email} not found`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      });

    if (!profile?.password)
      throw new ApiError(`${userTypeModel} doesn't have a password`);

    const matchingPassword = await compare(
      loginInput.password,
      profile.password
    );

    if (!matchingPassword)
      throw new ApiError(`Invalid password please try again`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      });

    if (userType === 'ADMIN') {
      return { type: 'ADMIN', user: profile as UserEntity };
    }

    return { type: 'INVESTOR', investor: profile as InvestorEntity };
  }

  async retrieveProfile(params: {
    type: UserType;
    email: string;
  }): Promise<ProfileEntity> {
    const { type, email } = params;

    const profile =
      type === 'ADMIN'
        ? await this.prisma.user.findUnique({
            where: { email },
          })
        : await this.prisma.investor.findUnique({
            where: { email },
          });

    if (!profile)
      throw new ApiError(`${type} ${email} not found`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
      });

    return {
      id: profile.id,
      type: params.type,
      first_name: profile.first_name,
      middle_name: profile.middle_name,
      password: profile.password,
      last_name: profile.last_name,
      email: profile.email,
    };
  }

  async requestPasswordReset(
    resetPasswordInput: RequestPasswordResetInput,
    session: ApplicationSessionEntity
  ): Promise<ProfileEntity> {
    const PASSWORD_RESET_TOKEN_LENGTH = 40;

    const profile = await this.retrieveProfile({
      type: session.user_type,
      email: resetPasswordInput.email,
    });

    const generatedToken = randomBytes(PASSWORD_RESET_TOKEN_LENGTH).toString(
      'hex'
    );

    const passwordResetToken = await this.prisma.passwordResetToken.create({
      data: {
        user_id: session.user_type === 'ADMIN' ? profile.id : undefined,
        investor_id: session.user_type === 'INVESTOR' ? profile.id : undefined,
        token: generatedToken,
        expiration_date: DateTime.utc().plus({ day: 1 }).toJSDate(),
      },
      include: { user: true },
    });

    await this.prisma.passwordResetToken.updateMany({
      where: { id: { not: passwordResetToken.id } },
      data: { is_deactivated: true },
    });

    this.eventEmitter.emit(
      AUTH_EVENTS.requestPasswordReset,
      new RequestPasswordResetEvent({
        requestedByProfile: profile,
        token: generatedToken,
      })
    );

    return profile;
  }

  async validatePasswordResetToken(
    validatePasswordResetTokenInput: ValidatePasswordResetTokenInput
  ) {
    const resetToken = await this.prisma.passwordResetToken.findFirst({
      where: {
        token: validatePasswordResetTokenInput.token,
        is_deactivated: false,
      },
      orderBy: { expiration_date: 'desc' },
    });

    if (!resetToken)
      throw new ApiError(`Password reset token doesn't exist`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation:
          'The reset token no longer exist or has expired. Try resending the password reset request.',
      });

    if (
      DateTime.fromJSDate(resetToken.expiration_date).diffNow(['seconds'])
        .seconds < 0
    )
      throw new ApiError(`Password reset token has expired`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation:
          'The reset token has expired. Try resending the password reset request.',
      });

    return resetToken;
  }

  async resetPasswordWithToken(resetPasswordInput: ResetPasswordInput) {
    const resetToken = await this.validatePasswordResetToken({
      token: resetPasswordInput.token,
    });

    if (!resetToken)
      throw new ApiError(`Password reset token doesn't exist`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation:
          'The reset token no longer exist or has expired. Try resending the password reset request.',
      });

    if (!resetToken.user_id && !resetToken.investor_id)
      throw new ApiError(
        'Invalid reset token, no user or investor attached to the token',
        {
          statusCode: HttpStatus.UNAUTHORIZED,
        }
      );

    const type = resetToken.user_id ? UserType.ADMIN : UserType.INVESTOR;

    const profile = resetToken.user_id
      ? await this.userService.update(resetToken.user_id, {
          id: resetToken.user_id,
          password: resetPasswordInput.new_password,
        })
      : await this.investorService.update(resetToken.investor_id as number, {
          password: resetPasswordInput.new_password,
          id: resetToken.investor_id as number,
        });

    await this.prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { is_deactivated: true },
    });

    return new ProfileEntity({
      email: profile.email,
      first_name: profile.first_name,
      id: profile.id,
      type: type,
      last_name: profile.last_name,
      middle_name: profile.middle_name,
      password: profile.password,
    });
  }
}

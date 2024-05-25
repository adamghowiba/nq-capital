import { HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { compare } from 'bcrypt';
import { ApiError } from '../../common/exceptions/api.error';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { PrismaService } from '@nq-capital/service-database';
import { SerializeSessionPayload } from './session/session.serializer';
import { InvestorEntity, UserEntity } from '@nq-capital/iam';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2
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

  // async requestPasswordReset(resetPasswordInput: RequestPasswordResetInput) {
  //   const PASSWORD_RESET_TOKEN_LENGTH = 40

  //   const user = await this.prisma.user.findUnique({
  //     where: { email: resetPasswordInput.email },
  //     include: { password_reset_token: true },
  //   })

  //   this.eventEmitter.emit('')

  //   if (!user)
  //     throw new ApiError('User with that email does not exist.', {
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       type: 'authenticate_error',
  //       explanation:
  //         'Please check the spelling, and formatting of the email to ensure it is correct.',
  //     })

  //   const generatedToken = randomBytes(PASSWORD_RESET_TOKEN_LENGTH).toString('hex')

  //   const passwordResetToken = await this.prisma.passwordResetToken.create({
  //     data: {
  //       user_id: user.id,
  //       token: generatedToken,
  //       expiration_date: DateTime.utc().plus({ hour: 1 }).toJSDate(),
  //     },
  //     include: { user: true },
  //   })

  //   await this.prisma.passwordResetToken.updateMany({
  //     where: { id: { not: passwordResetToken.id } },
  //     data: { deactivated: true },
  //   })

  //   this.eventEmitter.emit(
  //     AUTH_EVENTS.requestPasswordReset,
  //     new RequestPasswordResetEvent({
  //       requestedByUser: passwordResetToken.user,
  //       token: generatedToken,
  //     })
  //   )

  //   return passwordResetToken.user
  // }

  // async validatePasswordResetToken(
  //   validatePasswordResetTokenInput: ValidatePasswordResetTokenInput
  // ) {
  //   const token = await this.prisma.passwordResetToken.findFirst({
  //     where: {
  //       token: validatePasswordResetTokenInput.token,
  //       user_id: validatePasswordResetTokenInput.user_id,
  //       deactivated: false,
  //     },
  //     orderBy: { expiration_date: 'desc' },
  //   })

  //   if (!token)
  //     throw new ApiError(`Password reset token doesn't exist`, {
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       type: 'authenticate_error',
  //       explanation:
  //         'The reset token no longer exist or has expired. Try resending the password reset request.',
  //     })

  //   if (DateTime.fromJSDate(token.expiration_date).diffNow(['seconds']).seconds < 0)
  //     throw new ApiError(`Password reset token has expired`, {
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       type: 'authenticate_error',
  //       explanation: 'The reset token has expired. Try resending the password reset request.',
  //     })

  //   return token
  // }

  // async resetPasswordWithToken(resetPasswordInput: ResetPasswordInput) {
  //   const validation = await this.validatePasswordResetToken({
  //     token: resetPasswordInput.token,
  //     user_id: resetPasswordInput.user_id,
  //   })

  //   if (!validation)
  //     throw new ApiError(`Password reset token doesn't exist`, {
  //       statusCode: HttpStatus.UNAUTHORIZED,
  //       type: 'authenticate_error',
  //       explanation:
  //         'The reset token no longer exist or has expired. Try resending the password reset request.',
  //     })

  //   const user = await this.userService.update(resetPasswordInput.user_id, {
  //     id: resetPasswordInput.user_id,
  //     password: resetPasswordInput.new_password,
  //   })

  //   await this.prisma.passwordResetToken.update({
  //     where: { id: validation.id },
  //     data: { deactivated: true },
  //   })

  //   return user
  // }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserType } from '@prisma/client';
import { ApiError } from '../../../common/exceptions/api.error';
import { isEnum } from 'class-validator';
import {
  IStrategyOptionsWithRequest,
  Strategy,
  VerifyFunctionWithRequest,
} from 'passport-local';
import { AuthService } from '../auth.service';
import {
  SerializeSessionPayloadV2
} from '../session/session.serializer';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    } as IStrategyOptionsWithRequest);
  }

  validate: VerifyFunctionWithRequest = async (
    req,
    email: string,
    password: string
  ) => {
    const userType = req.body?.user_type as UserType;

    if (!userType)
      throw new ApiError('User type is required', { statusCode: 400 });

    const validUserType = isEnum(userType, UserType);

    if (!validUserType)
      throw new ApiError(
        `Invalid user type must of one of ${Object.values(UserType).join(
          ', '
        )}`,
        { statusCode: 400 }
      );

    const user = await this.authService.login({
      email: email,
      password,
      user_type: userType,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      investorId: user.type === 'INVESTOR' ? user.investor.id : req?.user?.investor?.id,
      userId: user.type === 'ADMIN' ? user.user.id : req?.user?.user?.id,
    } as SerializeSessionPayloadV2;
  };
}

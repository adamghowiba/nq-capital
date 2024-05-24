import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InvestorEntity } from '../../investors/entities/investor.entity';
import { InvestorsService } from '../../investors/investors.service';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

/**
 * Serialized session object that is stored in the session store
 */
interface SerializedSession {
  userId: number | null;
  investorId: number | null;
}

/**
 * Incoming payload from a login
 */
export type SerializeSessionPayload =
  | { type: 'INVESTOR'; investor: InvestorEntity }
  | { type: 'ADMIN'; user: UserEntity };

export type SerializeSessionPayloadV2 = {
  userId?: number;
  investorId?: number;
};

/**
 * Deserialized session object that is attached to the request object
 */
interface DeserializedSessionResponse {
  user: UserEntity | null;
  investor: InvestorEntity | null;
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  private logger = new Logger('SessionSerializer');

  constructor(
    private readonly userService: UsersService,
    private readonly investorService: InvestorsService
  ) {
    super();
  }

  serializeUser(
    payload: SerializeSessionPayloadV2,
    done: (err: Error | null, user: SerializedSession) => void
  ) {
    done(null, {
      investorId: payload.investorId || null,
      userId: payload.userId || null,
    });
  }

  async deserializeUser(
    payload: SerializedSession,
    done: (err: Error | null, user: DeserializedSessionResponse) => void
  ) {
    const sessionObject: DeserializedSessionResponse = {
      user: null,
      investor: null,
    };

    if (payload?.userId) {
      try {
        const user = await this.userService.retrieve({ id: payload.userId });
        sessionObject['user'] = user;
      } catch (error) {
        this.logger.error('Attempted to deserialize investor but failed');
      }
    }

    if (payload?.investorId) {
      try {
        const investor = await this.investorService.retrieve(
          payload.investorId
        );
        sessionObject['investor'] = investor;
      } catch (error) {
        this.logger.error('Attempted to deserialize investor but failed');
      }
    }

    done(null, sessionObject);
  }
}

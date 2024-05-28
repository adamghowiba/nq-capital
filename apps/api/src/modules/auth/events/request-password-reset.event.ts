import { IsString } from 'class-validator';
import { ProfileEntity } from '../entities/profile.entity';

export class RequestPasswordResetEvent {
  requestedByProfile!: ProfileEntity;

  @IsString()
  token!: string;

  constructor(data: RequestPasswordResetEvent) {
    Object.assign(this, data);
  }
}

import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';
import { UserEntity } from './user.entity';
import { InvestorEntity } from './investor.entity';

@ObjectType()
export class SessionEntity {
  @Field(() => UserEntity, { nullable: true })
  user: UserEntity | null = null;

  @Field(() => InvestorEntity, { nullable: true })
  investor: InvestorEntity | null = null;
}

export type Application = 'investors_portal' | 'admin_portal';

/**
 * Returns the session and the application that originated
 * the request
 */
export class ApplicationSessionEntity extends SessionEntity {
  application!: Application;
  user_type!: UserType;
}

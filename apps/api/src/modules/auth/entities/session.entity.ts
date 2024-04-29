import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../users/entities/user.entity';
import { InvestorEntity } from '../../investors/entities/investor.entity';

@ObjectType()
export class SessionEntity {
  @Field(() => UserEntity, { nullable: true })
  user: UserEntity | null = null;

  @Field(() => InvestorEntity, { nullable: true })
  investor: InvestorEntity | null = null;
}

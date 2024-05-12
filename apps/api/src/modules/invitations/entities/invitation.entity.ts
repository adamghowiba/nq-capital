import { Field, GraphQLISODateTime, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { $Enums, Invitation, InvitationStatus, InvitationType } from '@prisma/client';

registerEnumType(InvitationStatus, {name: "InvitationStatus"})
registerEnumType(InvitationType, {name: "InvitationType"})

@ObjectType()
export class InvitationEntity implements Invitation {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  invitation_code!: string;

  @Field(() => InvitationStatus)
  status!: InvitationStatus;

  @Field(() => InvitationType)
  type!: InvitationType;

  @Field(() => Int)
  investor_id!: number | null;

  @Field(() => Int)
  invited_by_user_id!: number;

  @Field(() => GraphQLISODateTime)
  responded_at!: Date | null;

  @Field(() => Int)
  resent_count!: number;

  @Field(() => GraphQLISODateTime)
  expires_at!: Date;

  @Field(() => GraphQLISODateTime)
  sent_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

}

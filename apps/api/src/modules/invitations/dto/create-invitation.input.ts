import { Field, HideField, InputType } from '@nestjs/graphql';
import {
  InvitationStatus,
  InvitationType,
  Prisma
} from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';

@InputType()
export class CreateInvitationInput
  implements Prisma.InvitationUncheckedCreateInput
{

  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => InvitationType)
  @IsEnum(InvitationType)
  type!: InvitationType;

  @HideField()
  id?: number | undefined;

  @HideField()
  status?: InvitationStatus | undefined;

  @HideField()
  investor_id?: number | null | undefined;

  @HideField()
  invited_by_user_id!: number;

  @HideField()
  invitation_code!: string;

  @HideField()
  responded_at?: string | Date | null | undefined;

  @HideField()
  resent_count?: number | undefined = 0;

  @HideField()
  expires_at?: string | Date | undefined;

  @HideField()
  sent_at?: string | Date | undefined = new Date();

  @HideField()
  updated_at?: string | Date | undefined;
}

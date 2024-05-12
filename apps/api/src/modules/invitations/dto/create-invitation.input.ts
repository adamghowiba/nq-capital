import { InputType, Int, Field, HideField } from '@nestjs/graphql';
import {
  $Enums,
  InvitationStatus,
  InvitationType,
  Prisma,
} from '@prisma/client';
import { IsEmail, IsEnum, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateInvitationInput
  implements Prisma.InvitationUncheckedCreateInput
{
  @HideField()
  id?: number | undefined;

  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => InvitationType)
  @IsEnum(InvitationType)
  type!: InvitationType;

  @Field(() => InvitationStatus, { nullable: true })
  @IsEnum(InvitationStatus)
  status?: InvitationStatus | undefined;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  investor_id?: number | null | undefined;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
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

import { Field, HideField, InputType } from '@nestjs/graphql';
import { Prisma, UserRole } from '@prisma/client';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput implements Prisma.UserUncheckedCreateInput {
  @IsEmail()
  email!: string;

  first_name!: string;

  middle_name?: string;

  last_name!: string;

  password!: string;

  avatar?: string;

  mobile_number?: string | null;

  @HideField()
  role?: UserRole;

  @HideField()
  id?: number;

  @HideField()
  password_reset_token?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;

  @HideField()
  sent_invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutInvited_byInput;

  @HideField()
  created_at?: string | Date;

  @HideField()
  updated_at?: string | Date;
}

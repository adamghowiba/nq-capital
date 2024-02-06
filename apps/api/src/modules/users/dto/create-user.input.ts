import { Field, HideField, InputType } from '@nestjs/graphql';
import { Prisma, UserRole } from '@prisma/client';

@InputType()
export class CreateUserInput implements Prisma.UserUncheckedCreateInput {
  id?: number;

  email: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  first_name: string;

  middle_name?: string;

  last_name: string;

  password: string;

  avatar?: string;

  mobile_number?: string;

  @HideField()
  password_reset_token?: Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput;

  @HideField()
  sent_invitations?: Prisma.InvitationUncheckedCreateNestedManyWithoutInvited_byInput;

  @HideField()
  created_at?: string | Date;

  @HideField()
  updated_at?: string | Date;
}

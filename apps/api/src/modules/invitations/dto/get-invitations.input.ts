import { ArgsType, Field } from '@nestjs/graphql';
import { InvitationStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

@ArgsType()
export class ListInvitationArgs {
  /**
   * Filter by an array of emails
   */
  @Field(() => [String], { nullable: true })
  @IsEmail({}, { each: true })
  @IsOptional()
  emails?: string[];

  /**
   * Filter by a list of statuses
   */
  @Field(() => [InvitationStatus], { nullable: true })
  @IsEnum(InvitationStatus, { each: true })
  @IsOptional()
  statuses?: InvitationStatus[];

  @Field(() => InvitationStatus, { nullable: true })
  @IsEnum(InvitationStatus)
  @IsOptional()
  status?: InvitationStatus;
}

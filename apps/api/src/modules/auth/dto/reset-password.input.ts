import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsString()
  @Field(() => String)
  token!: string;

  @IsString()
  @Field(() => String)
  new_password!: string;
}

/**
 * DTO when an authenticated user changes their password
 */
@InputType()
export class ChangePasswordInput {
  @IsString()
  @Field(() => String)
  password!: string;

  @IsString()
  @Field(() => String)
  new_password!: string;
}

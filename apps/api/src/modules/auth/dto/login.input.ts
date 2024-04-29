import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { UserType } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { TransformLowercase } from '../../../common/decorators/transformers/transform-lowercase.decorator';

registerEnumType(UserType, { name: 'UserType', description: 'Type of user' });

@InputType({ description: 'Login user input' })
export class LoginInput {
  @Field(() => String, { description: 'Email of the user' })
  @TransformLowercase()
  @IsEmail()
  email!: string;

  @Field(() => String, { description: 'Password of the user' })
  @IsString()
  password!: string;

  @Field(() => UserType)
  user_type!: UserType;
}

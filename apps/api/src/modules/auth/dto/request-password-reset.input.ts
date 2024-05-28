import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { TransformLowercase } from '../../../common/decorators/transformers/transform-lowercase.decorator';

@InputType()
export class RequestPasswordResetInput {
  @TransformLowercase()
  @IsEmail()
  @Field(() => String)
  email!: string;
}

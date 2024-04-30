import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { SendMessageInput } from './create-message.input';

@InputType()
export class UpdateMessageInput extends PartialType(SendMessageInput) {
  @Field(() => Int)
  id!: number;
}

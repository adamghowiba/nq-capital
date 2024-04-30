import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { MessageEntity } from './entities/message.entity';
import { UpdateMessageInput } from './dto/update-message.input';
import { SendMessageInput } from './dto/create-message.input';
import { InvestorEntity } from '../investors/entities/investor.entity';
import { UserEntity } from '../users/entities/user.entity';

@Resolver(() => MessageEntity)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => MessageEntity)
  createMessage(
    @Args('createMessageInput') createMessageInput: SendMessageInput
  ) {
    return this.messagesService.create(createMessageInput);
  }

  @Query(() => [MessageEntity], { name: 'messages' })
  findAll() {
    return this.messagesService.list();
  }

  @Query(() => MessageEntity, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.retrieve(id);
  }

  @Mutation(() => MessageEntity)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput
  ) {
    return this.messagesService.update(
      updateMessageInput.id,
      updateMessageInput
    );
  }

  @Mutation(() => MessageEntity)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }

  @ResolveField(() => InvestorEntity, { name: 'sent_by_investor', nullable: true })
  getSentByInvestorField(@Parent() message: MessageEntity) {
    return this.messagesService.getMessageSentByInvestorField(message.id);
  }

  @ResolveField(() => UserEntity, { name: 'sent_by_user', nullable: true })
  getSentByUserField(@Parent() message: MessageEntity) {
    return this.messagesService.getMessageSentByUserField(message.id);
  }
}

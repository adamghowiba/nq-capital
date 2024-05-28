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
import { AssetEntity } from '../assets/entities/asset.entity';
import { ApplicationSessionEntity, InvestorEntity, UserEntity } from '@nq-capital/iam';
import { GqlSession } from '../../common/decorators/auth/session.decorator';

@Resolver(() => MessageEntity)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => MessageEntity)
  createMessage(
    @Args('createMessageInput') createMessageInput: SendMessageInput,
    @GqlSession() session: ApplicationSessionEntity
  ) {
    return this.messagesService.create(createMessageInput, session);
  }

  @Query(() => [MessageEntity], { name: 'messages' })
  list() {
    return this.messagesService.list();
  }

  @Query(() => MessageEntity, { name: 'message' })
  retrieve(@Args('id', { type: () => Int }) id: number) {
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

  @ResolveField(() => InvestorEntity, {
    name: 'sent_by_investor',
    nullable: true,
  })
  getSentByInvestorField(@Parent() message: MessageEntity) {
    return this.messagesService.getMessageSentByInvestorField(message.id);
  }

  @ResolveField(() => UserEntity, { name: 'sent_by_user', nullable: true })
  getSentByUserField(@Parent() message: MessageEntity) {
    return this.messagesService.getMessageSentByUserField(message.id);
  }

  @ResolveField(() => [AssetEntity], { name: 'assets' })
  getAssetsField(@Parent() message: MessageEntity) {
    return this.messagesService.getAssetsField(message.id);
  }
}

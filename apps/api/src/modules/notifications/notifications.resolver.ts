import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { NotificationEntity } from './entities/notification.entity';
import { SendNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { PaginationArgs } from '../../common/dto/pagination.args';
import { PrismaService } from '@nq-capital/service-database';
import { InvestorEntity } from '@nq-capital/iam';

@Resolver(() => NotificationEntity)
export class NotificationsResolver {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly prisma: PrismaService
  ) {}

  @Mutation(() => NotificationEntity)
  sendNotification(
    @Args('sendNotificationInput')
    sendNotificationInput: SendNotificationInput
  ) {
    return this.notificationsService.send(sendNotificationInput);
  }

  @Query(() => [NotificationEntity], { name: 'notifications' })
  list(@Args() pagination: PaginationArgs) {
    return this.notificationsService.list(pagination);
  }

  @Query(() => NotificationEntity, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.retrieve(id);
  }

  @Mutation(() => NotificationEntity)
  updateNotification(
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput
  ) {
    return this.notificationsService.update(
      updateNotificationInput.id,
      updateNotificationInput
    );
  }

  @Mutation(() => NotificationEntity)
  archiveNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.archive(id);
  }

  @ResolveField(() => InvestorEntity, { nullable: true, name: 'investor' })
  getInvestorField(@Parent() notification: NotificationEntity) {
    if (!notification.investor_id) return null;

    return this.prisma.notification
      .findUnique({
        where: { id: notification.id },
      })
      .investor();
  }

  @ResolveField(() => InvestorEntity, { nullable: true, name: 'user' })
  getUserField(@Parent() notification: NotificationEntity) {
    if (!notification.user_id) return null;

    return this.prisma.notification
      .findUnique({
        where: { id: notification.id },
      })
      .user();
  }
}

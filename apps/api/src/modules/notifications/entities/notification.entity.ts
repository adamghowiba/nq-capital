import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import {
  $Enums,
  Notification,
  NotificationChannel,
  NotificationPriority,
  NotificationType,
  Prisma,
} from '@prisma/client';
import { Paginated } from '../../../common/entities/api-pagination.entity';
import { GraphQLJSONObject } from 'graphql-type-json';

registerEnumType(NotificationType, {
  name: 'NotificationType',
});

registerEnumType(NotificationChannel, {
  name: 'NotificationChannel',
});

registerEnumType(NotificationPriority, {
  name: 'NotificationPriority',
});

@ObjectType()
export class NotificationEntity implements Notification {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  content!: string;

  @Field(() => Boolean)
  is_archived!: boolean;

  @Field(() => NotificationType)
  type!: NotificationType;

  @Field(() => NotificationPriority)
  priority!: NotificationPriority;

  @Field(() => [NotificationChannel])
  channel!: NotificationChannel[];

  @Field(() => Boolean)
  is_read!: boolean;

  @Field(() => GraphQLJSONObject)
  meta!: Prisma.JsonValue;

  @Field(() => Int, { nullable: true })
  user_id!: number | null;

  @Field(() => Int, { nullable: true })
  investor_id!: number | null;

  @Field(() => GraphQLISODateTime, { nullable: true })
  read_at!: Date | null;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;
}

@ObjectType()
export class PaginatedNotification extends Paginated(NotificationEntity) {}

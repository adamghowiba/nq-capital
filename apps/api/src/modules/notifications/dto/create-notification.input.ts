import { Field, HideField, InputType } from '@nestjs/graphql';
import { NotificationChannel, NotificationPriority, NotificationType, Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class SendNotificationInput implements Prisma.NotificationUncheckedCreateInput {

  @Field(() => String)
  @IsString()
  title!: string;

  @Field(() => String)
  @IsString()
  content!: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_archived?: boolean | undefined;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType | undefined;

  @Field(() => NotificationPriority)
  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: NotificationPriority | undefined;

  @Field(() => [NotificationChannel])
  @IsEnum(NotificationChannel, { each: true })
  channel?: NotificationChannel[];

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_read?: boolean | undefined;

  @Field(() => GraphQLJSON, { nullable: true })
  meta?: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue | undefined;

  @Field(() => Number, { nullable: true })
  user_id?: number | null | undefined;

  @Field(() => Number, { nullable: true })
  investor_id?: number | null | undefined;

  @HideField()
  read_at?: string | Date | null | undefined;
}

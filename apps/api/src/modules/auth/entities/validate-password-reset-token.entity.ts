import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ValidatePasswordResetTokenEntity {
  @Field(() => GraphQLISODateTime, { description: 'Expiration date of password reset token' })
  expiration_date!: string
}

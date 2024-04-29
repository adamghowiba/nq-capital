import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LogoutEntity {
  @Field(() => String)
  status!: string;
}

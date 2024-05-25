import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { CreateInvestorInput } from "../../investors/dto/create-investor.input";

@InputType()
export class AcceptInvestorInvitationInput extends CreateInvestorInput {
  @IsString()
  @IsOptional()
  @Field(() => String)
  invitation_code!: string;
}

import {
  Field,
  InputType,
  Int,
  OmitType,
  PartialType
} from '@nestjs/graphql';
import { CreateInvestorFundInput } from '../../investors/dto/create-investor-fund.input';
import { CreateFundInput } from './create-fund.input';

@InputType()
export class UpdateFundInput extends PartialType(
  OmitType(CreateFundInput, ['initial_balance'])
) {
  @Field(() => Int)
  id!: number;
}

export class ConnectFundInvestorInput extends OmitType(
  CreateInvestorFundInput,
  ['fund_id']
) {}

/**
 * Input to connect or disconnect investors to a fund
 */
@InputType()
export class UpdateFundInvestors {
  @Field(() => Int)
  fund_id!: number;

  @Field(() => [ConnectFundInvestorInput])
  connect?: ConnectFundInvestorInput[];

  @Field(() => [Int])
  disconnect?: number[];
}

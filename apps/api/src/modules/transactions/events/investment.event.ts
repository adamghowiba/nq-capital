import { AddInvestmentInput } from '../../investor-funds/dto/update-fund-investors.input';

export class InvestmentEvent extends AddInvestmentInput {
  constructor(params: InvestmentEvent) {
    super();

    Object.assign(this, params);
  }
}

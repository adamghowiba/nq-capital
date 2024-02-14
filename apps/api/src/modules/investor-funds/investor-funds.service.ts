import { Injectable } from '@nestjs/common';
import { CreateInvestorFundInput } from './dto/create-investor-fund.input';
import { UpdateInvestorFundInput } from './dto/update-investor-fund.input';

@Injectable()
export class InvestorFundsService {
  create(createInvestorFundInput: CreateInvestorFundInput) {
    return 'This action adds a new investorFund';
  }

  findAll() {
    return `This action returns all investorFunds`;
  }

  findOne(id: number) {
    return `This action returns a #${id} investorFund`;
  }

  update(id: number, updateInvestorFundInput: UpdateInvestorFundInput) {
    return `This action updates a #${id} investorFund`;
  }

  remove(id: number) {
    return `This action removes a #${id} investorFund`;
  }
}

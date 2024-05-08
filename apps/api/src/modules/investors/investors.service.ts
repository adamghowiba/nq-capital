import { Injectable } from '@nestjs/common';
import { PrismaService } from '@nq-capital/service-database';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';
import { InvestorEntity } from './entities/investor.entity';
import { InvestorPortfolioEntity } from './entities/investor-portfilo.entity';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvestorInput: CreateInvestorInput) {
    const investor = await this.prisma.investor.create({
      data: {
        ...createInvestorInput,
        bank_accounts: createInvestorInput.bankAccountsCreateMany,
      },
    });

    return investor;
  }

  async list(): Promise<InvestorEntity[]> {
    const investors = await this.prisma.investor.findMany();

    return investors;
  }

  async retrieve(id: number) {
    const investor = await this.prisma.investor.findUnique({ where: { id } });

    return investor;
  }

  async getInvestorPortfolio(id: number): Promise<InvestorPortfolioEntity> {
    const investor = await this.prisma.investorFund.findMany({
      where: { investor_id: id },
    });

    const totals = investor.reduce(
      (
        acc: Pick<InvestorPortfolioEntity, 'total_balance' | 'total_invested'>,
        curr
      ) => {
        // TODO!: May need to use Decimal library from prisma
        acc.total_invested += curr.invested_amount;

        acc.total_balance += curr.balance;
        return acc;
      },
      { total_invested: 0, total_balance: 0 }
    );

    return {
      total_balance: totals.total_balance,
      total_invested: totals.total_invested,
      total_pending_transactions: 0,
    };
  }

  async update(id: number, updateInvestorInput: UpdateInvestorInput) {
    const investor = await this.prisma.investor.update({
      where: { id },
      data: {
        ...updateInvestorInput,
      },
    });

    return investor;
  }

  async remove(id: number) {
    const investor = await this.prisma.investor.delete({ where: { id } });

    return investor;
  }

  async getInvestorBankAccountsField(params: { investorId: number }) {
    const bankAccounts = await this.prisma.investor
      .findUnique({ where: { id: params.investorId } })
      .bank_accounts();

    return bankAccounts;
  }
}

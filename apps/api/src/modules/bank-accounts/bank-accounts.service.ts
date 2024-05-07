import { Injectable } from '@nestjs/common';
import { CreateBankAccountInput } from './dto/create-bank-account.input';
import { UpdateBankAccountInput } from './dto/update-bank-account.input';
import { PrismaService } from '@nq-capital/service-database';

@Injectable()
export class BankAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBankAccountInput: CreateBankAccountInput) {
    const bankAccount = await this.prisma.bankAccount.create({
      data: createBankAccountInput,
    });

    return bankAccount;
  }

  async list() {
    const bankAccount = await this.prisma.bankAccount.findMany({});

    return bankAccount;
  }

  async retrieve(id: number) {
    const bankAccount = await this.prisma.bankAccount.findUnique({
      where: { id },
    });

    return bankAccount;
  }

  async update(id: number, updateBankAccountInput: UpdateBankAccountInput) {
    const bankAccount = await this.prisma.bankAccount.update({
      where: { id },
      data: updateBankAccountInput,
    });

    return bankAccount;
  }

  async remove(id: number) {
    const bankAccount = await this.prisma.bankAccount.delete({ where: { id } });

    return bankAccount;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateFundInput } from './dto/create-fund.input';
import { UpdateFundInput } from './dto/update-fund.input';
import { PrismaService } from '@nq-capital/service-database';
import { FundEntity } from './entities/fund.entity';

@Injectable()
export class FundsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFundInput: CreateFundInput) {
    const { initial_balance, ...rest } = createFundInput;

    const fund = await this.prisma.fund.create({
      data: {
        ...rest,
        balance: initial_balance || 0,
        investors: createFundInput.investors
          ? {
              create: [...createFundInput.investors],
            }
          : undefined,
      },
    });

    return fund;
  }

  async updateFundInvestors() {
    // TODO: Function to remove or add investors to fund
  }

  async list() {
    const fund = await this.prisma.fund.findMany({});

    return fund;
  }

  async retrieve(id: number): Promise<FundEntity> {
    const fund = await this.prisma.fund.findUniqueOrThrow({ where: { id } });

    return fund;
  }

  async retrieveByName(name: string) {
    const fund = await this.prisma.fund.findUnique({ where: { name } });

    return fund;
  }

  async update(id: number, updateFundInput: UpdateFundInput) {
    const fund = await this.prisma.fund.update({
      where: { id },
      data: { ...updateFundInput, investors: undefined },
    });

    return fund;
  }

  async remove(id: number) {
    const fund = await this.prisma.fund.delete({ where: { id } });

    return fund;
  }
}

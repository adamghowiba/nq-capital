import { Injectable } from '@nestjs/common';
import { CreateInvestorInput } from './dto/create-investor.input';
import { UpdateInvestorInput } from './dto/update-investor.input';
import { PrismaService } from '@nq-capital/service-database';

@Injectable()
export class InvestorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvestorInput: CreateInvestorInput) {
    const investor = await this.prisma.investor.create({
      data: createInvestorInput,
    });

    return investor;
  }

  async list() {
    const investors = await this.prisma.investor.findMany();

    return investors;
  }

  async retrieve(id: number) {
    const investor = await this.prisma.investor.findUnique({ where: { id } });

    return investor;
  }

  async update(id: number, updateInvestorInput: UpdateInvestorInput) {
    const investor = await this.prisma.investor.update({
      where: { id },
      data: updateInvestorInput,
    });

    return investor;
  }

  async remove(id: number) {
    const investor = await this.prisma.investor.delete({where: {id}})

    return investor
  }
}

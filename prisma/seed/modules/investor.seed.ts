import { Prisma } from '@prisma/client';
import { prisma } from '../seed';

export const seedInvestors = async () => {
  const INVESTORS: Prisma.InvestorCreateInput[] = [
    {
      email: 'adam@webrevived.com',
      first_name: 'Adam',
      last_name: 'Ghowiba',
      account_status: 'ACTIVE',
      company_name: 'Web Revived LLC',
      is_accredited: true,
    },
    {
      email: 'john@webrevived.com',
      first_name: 'John',
      last_name: 'Doe',
      account_status: 'ACTIVE',
      company_name: 'John Doe LLC',
      is_accredited: true,
    },
    {
      email: 'mark.ware@gmail.com',
      first_name: 'Mark',
      last_name: 'Ware',
      is_accredited: false,
      account_status: 'ACTIVE',
    },
  ];

  const investors = await prisma.$transaction(
    INVESTORS.map((investor) => {
      return prisma.investor.upsert({
        where: { email: investor.email },
        create: investor,
        update: investor,
      });
    })
  );

  console.log(`Seeded ${investors.length} investors`)

  return investors;
};

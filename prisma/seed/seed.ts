import { PrismaClient } from '@prisma/client';
import { seedInvestors } from './modules/investor.seed';

export const prisma = new PrismaClient();

export const seedDevelopment = async () => {
  const investors = await seedInvestors();
};

export const seed = async () => {
  console.log(process.env.NODE_ENV);

  if (process.env['NODE_ENV'] === 'development') {
    await seedDevelopment();
    return;
  }
};

seed()

import { PrismaClient } from '@prisma/client';
import { seedInvestors } from './modules/investor.seed';
import { seedProductionUsers } from './modules/users.seed';

export const prisma = new PrismaClient();

export const seedDevelopment = async () => {
  const investors = await seedInvestors();
};

export const seed = async () => {
  await seedProductionUsers();

  if (process.env['NODE_ENV'] === 'development') {
    await seedDevelopment();
    return;
  }
};

seed();

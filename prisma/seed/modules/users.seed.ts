import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { prisma } from '../seed';

const adminPassword = process.env?.['ADMIN_PASSWORD'] || 'password';
const hashedPassword = hashSync(
  adminPassword,
  process.env?.['SALT_ROUNDS'] || 10
);

export const seedProductionUsers = async () => {
  const USERS: Prisma.UserUpsertArgs[] = [
    {
      where: {
        email: 'admin@webrevived.com',
      },
      update: {},
      create: {
        email: 'admin@airhublabs.com',
        first_name: 'Admin',
        last_name: 'Admin',
        role: 'ADMIN',
        password: hashedPassword,
      },
    },
  ];

  const transaction = await prisma.$transaction(
    USERS.map((user) => prisma.user.upsert(user))
  );

  return transaction;
};

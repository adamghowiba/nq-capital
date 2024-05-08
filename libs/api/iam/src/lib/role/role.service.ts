import { Injectable } from '@nestjs/common';
import { AbilityBuilder, PureAbility, subject } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';
import { Investor, Transaction, User } from '@prisma/client';
import { SessionEntity } from '../entities/session.entity';
import { UserEntity } from '../entities/user.entity';
import { InvestorEntity } from '../entities/investor.entity';

export type AppAction = 'read' | 'update' | 'create' | 'delete' | 'manage';
export type AppSubjects = Subjects<{
  User: User;
  Investor: Investor;
  Transaction: Transaction;
}>;

export type AppAbility = PureAbility<
  [AppAction, AppSubjects | 'all'],
  PrismaQuery
>;

const getUserAbility = (user: UserEntity) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  if (user.role === 'ADMIN') {
    can('manage', 'all');

    return build();
  }

  can('read', 'Investor');
  can('update', 'Investor');
  can('create', 'Investor');
  cannot('delete', 'Investor').because("You can't delete investors");

  can('read', 'User');
  can('update', 'User', { id: user.id });
  can('read', 'Transaction');

  return build();
};

// getSessionAbilityFactory
export const getInvestorAbility = (investor: InvestorEntity) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(
    createPrismaAbility
  );

  can('read', 'Investor', { id: investor.id });
  can('update', 'Investor', { id: investor.id });

  can('read', 'Transaction', { investor_id: investor.id });

  return build();
};

export const getSessionAbilityFactory = (session: SessionEntity) => {
  if (session.user) return getUserAbility(session.user);
  if (session.investor) return getInvestorAbility(session.investor);

  return undefined;
};

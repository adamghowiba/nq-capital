import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import { UserEntity } from '../modules/users/entities/user.entity';
import { SessionEntity } from '../modules/auth/entities/session.entity';
import { API_URL, DOMAIN_HOST } from '@nq-capital/utils-constants';

const isProduction = process.env['NODE_ENV'] === 'production';

const secure = isProduction ? true : undefined;
const domain = isProduction ? `.${DOMAIN_HOST}` : undefined;
const sameSite = isProduction ? 'none' : 'lax';
const maxAge = 1000 * 60 * 60 * 24 * 4;

const prismaSessionStore = new PrismaSessionStore(new PrismaClient(), {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

export const prismaSession = session({
  secret: process.env['SESSION_SECRET'] as string,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    secure,
    domain,
    sameSite,
    maxAge,
  },
  store: prismaSessionStore,
});

declare module 'express' {
  interface Request {
    user: SessionEntity;
  }
}

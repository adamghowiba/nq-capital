import { DynamicModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role.guard';
import { SessionEntity } from './entities/session.entity';

export class IamModule {
  static forRoot(params: unknown): DynamicModule {
    return {
      module: IamModule,
      providers: [
        {
          provide: APP_GUARD,
          useClass: RoleGuard,
        },
      ],
      exports: [],
    };
  }
}

declare module 'express' {
  interface Request {
    user: SessionEntity;
  }
}


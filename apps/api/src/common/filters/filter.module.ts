import { DynamicModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

export class ExceptionFilterModule {
  static forRoot(): DynamicModule {
    return {
      module: ExceptionFilterModule,
      providers: [
        {
          provide: APP_FILTER,
          useClass: HttpExceptionFilter,
        },
      ],
    };
  }
}

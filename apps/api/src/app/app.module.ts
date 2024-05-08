import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from '../modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { isDevelopment } from '../common/environment/app.environment';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPlugin } from '@apollo/server';
import { ComplexityPlugin } from '../common/plugins/complexity.plugin';
import { DatabaseModule } from '@nq-capital/service-database';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { InvestorsModule } from '../modules/investors/investors.module';
import { FundsModule } from '../modules/funds/funds.module';
import { PrismaDecimalScalar } from '../common/scalars/prisma-decimal.scalar';
import { InvestorFundsModule } from '../modules/investor-funds/investor-funds.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TransactionsModule } from '../modules/transactions/transactions.module';
import { TicketsModule } from '../modules/tickets/tickets.module';
import { AuthModule } from '../modules/auth/auth.module';
import { ExceptionFilterModule } from '../common/filters/filter.module';
import { PassportModule } from '@nestjs/passport';
import { MessagesModule } from '../modules/messages/messages.module';
import { AssetsController } from '../modules/assets/assets.controller';
import { AssetsModule } from '../modules/assets/assets.module';
import { BankAccountsModule } from '../modules/bank-accounts/bank-accounts.module';
import { IamModule } from '@nq-capital/iam';

const APP_MODULES = [
  UsersModule,
  InvestorsModule,
  FundsModule,
  InvestorFundsModule,
  TransactionsModule,
  TicketsModule,
  AuthModule,
  MessagesModule,
  AssetsModule,
  BankAccountsModule,
];

const APOLLO_PLUGINS: ApolloServerPlugin<any>[] = [];

if (isDevelopment)
  APOLLO_PLUGINS.push(
    ApolloServerPluginLandingPageLocalDefault({
      includeCookies: true,
      variables: {
        settings: {
          'request.credentials': 'include',
        },
      },
    })
  );

@Module({
  imports: [
    ...APP_MODULES,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: isDevelopment ? false : {
        settings: {
          'request.credentials': 'include',
        },
      },
      introspection: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      plugins: [...APOLLO_PLUGINS],
    }),
    EventEmitterModule.forRoot({
      delimiter: '.',
      newListener: true,
      removeListener: true,
      wildcard: true,
      global: true,
      verboseMemoryLeak: true,
    }),
    IamModule.forRoot({}),
    ExceptionFilterModule.forRoot(),
    PassportModule.register({ session: true, defaultStrategy: 'local' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ComplexityPlugin,
    PrismaDecimalScalar,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

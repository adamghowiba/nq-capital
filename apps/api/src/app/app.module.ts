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

const APP_MODULES = [UsersModule, InvestorsModule, FundsModule];

const APOLLO_PLUGINS: ApolloServerPlugin<any>[] = [];

if (isDevelopment)
  APOLLO_PLUGINS.push(ApolloServerPluginLandingPageLocalDefault());

@Module({
  imports: [
    ...APP_MODULES,
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: isDevelopment ? false : true,
      introspection: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      plugins: [...APOLLO_PLUGINS],
    }),
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

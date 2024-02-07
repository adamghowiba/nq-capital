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

const APP_MODULES = [UsersModule];

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
      resolverValidationOptions: {
        requireResolversForAllFields: 'ignore',
        requireResolversToMatchSchema: 'warn',
        requireResolversForResolveType: 'warn',
      },
      plugins: [...APOLLO_PLUGINS],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ComplexityPlugin,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({}),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

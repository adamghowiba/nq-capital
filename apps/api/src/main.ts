import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { prismaSession } from './config/session.config';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: (origin, callback) => callback(null, origin),
  });

  const port = process.env.PORT || 5000;

  app.use(prismaSession);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();

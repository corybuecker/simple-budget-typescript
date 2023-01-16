import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as hbs from 'hbs';
import hbsHelpers from './hbs_helpers';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useStaticAssets('public', {
    immutable: true,
    maxAge: '31536000',
  });

  app.setViewEngine('hbs');
  app.setBaseViewsDir('src/views');

  app.useGlobalPipes(
    new ValidationPipe({ forbidNonWhitelisted: true, transform: true }),
  );

  await app.listen(3000);
}

hbs.registerHelper('fingerprint', hbsHelpers['fingerprint']);
hbs.registerPartials('src/views/partials', (): void => { });

bootstrap();

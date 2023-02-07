import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';
import * as hbs from 'hbs';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { hbsHelpers } from './hbs_helpers';

dotenv.config();

hbs.registerHelper('fingerprint', hbsHelpers['fingerprint']);
hbs.registerPartials('src/views/partials');

passport.serializeUser(function (userId: string, done) {
  process.nextTick(() => done(null, userId));
});

passport.deserializeUser((userId: string, done) => {
  process.nextTick(() => done(null, userId));
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

bootstrap();

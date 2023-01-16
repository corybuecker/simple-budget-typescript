import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as hbs from 'hbs';
import * as passport from 'passport';
import * as session from 'express-session';
import hbsHelpers from './hbs_helpers';
import { AuthUser } from './auth/user';

async function bootstrap() {
  if (process.env.COOKIE_SECRET === undefined) throw new Error();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

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

dotenv.config();

passport.serializeUser(function (userId, cb) {
  process.nextTick(function () {
    return cb(null, userId);
  });
});

passport.deserializeUser(function (userId, cb) {
  process.nextTick(function () {
    return cb(null, new AuthUser(userId as string));
  });
});

bootstrap();

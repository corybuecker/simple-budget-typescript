import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import hbsHelpers from './hbs_helpers';
import { create } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets('public', {
    immutable: true,
    maxAge: '31536000',
  });

  const hbs = create({
    extname: 'hbs',
    layoutsDir: 'src/views/pages/',
    partialsDir: 'src/views/partials/',
    helpers: hbsHelpers(),
  });

  app.engine('hbs', hbs.engine);

  app.setViewEngine('hbs');
  app.setBaseViewsDir('src/views');

  await app.listen(3000);
}
bootstrap();

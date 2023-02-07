import { repl } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const replServer = await repl(AppModule);
  replServer.setupHistory('.nestjs_repl_history', () => {});
}

bootstrap();

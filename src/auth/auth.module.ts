import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import OidStrategy from './oidc.strategy';
import OidcClientProvider from './oidc_client.provider';
import UsersModule from 'src/users/users.module';
import WebSessionGuard from './session.guard';

@Module({
  imports: [UsersModule],
  providers: [OidStrategy, OidcClientProvider, WebSessionGuard],
  controllers: [AuthController]
})
export class AuthModule { }

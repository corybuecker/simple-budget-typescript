import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import OidStrategy from './oidc.strategy';
import OidcClientProvider from './oidc_client.provider';

@Module({
  providers: [AuthService, OidStrategy, OidcClientProvider],
})
export class AuthModule { }

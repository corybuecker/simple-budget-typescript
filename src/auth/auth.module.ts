import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { OidcStrategy } from './oidc.strategy';
import { OidcClientProvider } from './oidc_client.provider';
import { Session } from './session.entity';
import { SessionGuard } from './session.guard';
@Module({
  exports: [TypeOrmModule.forFeature([Session])],
  imports: [UsersModule, TypeOrmModule.forFeature([Session])],
  providers: [OidcStrategy, OidcClientProvider, SessionGuard],
  controllers: [AuthController],
})
export class AuthModule {}

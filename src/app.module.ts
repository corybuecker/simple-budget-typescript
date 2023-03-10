import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { connectionOptions } from './data-source';
import { SessionMiddleware } from './middleware/session';
import { SavingsModule } from './savings/savings.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connectionOptions,
      autoLoadEntities: true,
      logging: true,
    }),
    AccountsModule,
    UsersModule,
    AuthModule,
    SavingsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
  }
}

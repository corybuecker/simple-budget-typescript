import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/entities/account';
import { User } from 'src/entities/user';
import { AccountService } from './account.service';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  providers: [AccountService],
  controllers: [AccountsController],
})
export class AccountsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from '../account/account.service';
import { AccountsController } from './accounts.controller';
import { Account } from '../entities/account.entity';
import { User } from 'src/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  providers: [AccountService],
  controllers: [AccountsController],
})
export class AccountsModule { }

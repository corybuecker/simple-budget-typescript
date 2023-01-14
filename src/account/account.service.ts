import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) { }

  async all(userId: string): Promise<Account[]> {
    return this.accountsRepository
      .createQueryBuilder('account')
      .innerJoin('account.user', 'user')
      .where({ user: { id: userId } })
      .getMany();
  }

  async one(userId: string, id: string): Promise<Account | null> {
    return this.accountsRepository
      .createQueryBuilder('account')
      .innerJoin('account.user', 'user')
      .where({ id: id, user: { id: userId } })
      .getOne();
  }
}

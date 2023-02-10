import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account';
import { User } from '../entities/user';
import { AccountDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async all(userId: string): Promise<Account[]> {
    return this.accountsRepository
      .createQueryBuilder('account')
      .innerJoin('account.user', 'user')
      .where('user.id = :id', { id: userId })
      .getMany();
  }

  async one(userId: string, id: string): Promise<Account | null> {
    return this.accountsRepository
      .createQueryBuilder('account')
      .innerJoin('account.user', 'user')
      .where('user.id = :userId AND account.id = :id', { userId, id })
      .getOne();
  }

  async new(userId: string): Promise<Account> {
    const user: User | null = await this.usersRepository.findOneBy({
      id: userId,
    });
    if (user === null) throw new Error();
    const account: Account = new Account();
    account.userId = user.id;
    return account;
  }

  async save(accountDto: AccountDto, account: Account): Promise<Account> {
    account.amount = accountDto.amount;
    account.debt = accountDto.debt;
    account.name = accountDto.name;

    return this.accountsRepository.save(account);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountDto } from 'src/accounts/account.dto';
import { Account } from 'src/accounts/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

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

  async save(accountDto: AccountDto, account: Account): Promise<Account> {
    account.amount = accountDto.amount;
    account.debt = accountDto.debt;
    account.name = accountDto.name;

    return this.accountsRepository.save(account);
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Account } from 'src/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async all(userId: string): Promise<Account[]> {
    const user: User | null = await this.usersRepository.findOneBy({
      id: userId,
    });
    if (user === null) return [];

    return user.accounts;
  }
}

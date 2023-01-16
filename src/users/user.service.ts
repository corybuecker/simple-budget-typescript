import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from './user.entity';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async one(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where({ email })
      .getOne();
  }
}

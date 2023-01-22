import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saving } from './saving';

@Injectable()
export class SavingsService {
  constructor(
    @InjectRepository(Saving)
    private repository: Repository<Saving>,
  ) {}
  async all(userId: string): Promise<Saving[]> {
    return this.repository
      .createQueryBuilder('saving')
      .innerJoin('saving.user', 'user')
      .where({ user: { id: userId } })
      .getMany();
  }

  async one(userId: string, id: string): Promise<Saving | null> {
    return this.repository
      .createQueryBuilder('saving')
      .innerJoin('saving.user', 'user')
      .where({ id: id, user: { id: userId } })
      .getOne();
  }
}

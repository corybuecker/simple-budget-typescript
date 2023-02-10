import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account';
import { Saving } from './saving';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @OneToMany(() => Account, (account: Account) => account.user)
  accounts: Promise<Account[]>;

  @OneToMany(() => Saving, (saving: Saving) => saving.user)
  savings: Promise<Saving[]>;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../accounts/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @OneToMany(() => Account, (account: Account) => account.user)
  accounts: Promise<Account[]>;
}

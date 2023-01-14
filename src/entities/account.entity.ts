import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { IAccount } from 'src/account/account.interface';
@Entity()
export class Account implements IAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user: User) => user.accounts)
  user: Promise<User>;
}

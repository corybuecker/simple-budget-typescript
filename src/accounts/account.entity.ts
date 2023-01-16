import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from 'src/users/user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column({ default: false })
  debt: boolean;

  @ManyToOne(() => User, (user: User) => user.accounts)
  user: Promise<User>;
}

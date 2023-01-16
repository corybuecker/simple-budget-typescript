import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

import { User } from 'src/entities/user';
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

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (user: User) => user.accounts)
  user: Promise<User>;
}

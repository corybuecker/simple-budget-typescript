import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../data-source';
import { User } from '../entities/user';
import { UserService } from './user.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports: [
        TypeOrmModule.forRoot({
          ...connectionOptions,
          autoLoadEntities: true,
          logging: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

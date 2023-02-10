import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saving } from '../entities/saving';
import { SavingsController } from './savings.controller';
describe('SavingsController', () => {
  let controller: SavingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingsController],
      imports: [TypeOrmModule.forFeature([Saving])],
    }).compile();

    controller = module.get<SavingsController>(SavingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

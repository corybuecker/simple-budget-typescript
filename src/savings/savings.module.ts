import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saving } from './saving';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Saving])],
  providers: [SavingsService],
  controllers: [SavingsController],
})
export class SavingsModule {}

import { Module } from '@nestjs/common';
import { SavingsController } from './savings.controller';
import { SavingsService } from './savings.service';

@Module({
  providers: [SavingsService],
  controllers: [SavingsController],
})
export class SavingsModule {}

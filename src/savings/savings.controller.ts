import {
  Controller,
  Get,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedExceptionFilter } from '../auth/exception.filter';
import { SessionGuard } from '../auth/session.guard';
import { SavingsService } from './savings.service';

@UseGuards(SessionGuard)
@UseFilters(UnauthorizedExceptionFilter)
@Controller('savings')
export class SavingsController {
  constructor(private savingsService: SavingsService) {}

  @Get()
  @Render('savings/index')
  public async index(@Req() req: Request) {
    return {
      savings: await this.savingsService.all(req.user as string),
      layout: 'layouts/main',
    };
  }
}

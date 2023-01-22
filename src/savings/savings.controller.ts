import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from 'src/auth/exception.filter';
import { SessionGuard } from 'src/auth/session.guard';

@UseGuards(SessionGuard)
@UseFilters(UnauthorizedExceptionFilter)
@Controller('savings')
export class SavingsController {
  @Get()
  @Render('savings/index')
  public index() {
    return {
      savings: [],
      layout: 'layouts/main',
    };
  }
}

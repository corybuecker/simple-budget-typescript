import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccountDto } from 'src/accounts/account.dto';
import { Account } from 'src/accounts/account.entity';
import { AccountService } from 'src/accounts/account.service';
import { UnauthorizedExceptionFilter } from 'src/auth/exception.filter';
import { SessionGuard } from 'src/auth/session.guard';

@UseGuards(SessionGuard)
@UseFilters(UnauthorizedExceptionFilter)
@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) {}

  @Get()
  @Render('accounts/index')
  async index(@Req() request: Request): Promise<any> {
    return {
      layout: 'layouts/main',
      accounts: await this.accountService.all(request.user as string),
    };
  }

  @Get(':id/edit')
  @Render('accounts/edit')
  async edit(@Req() request: Request, @Param('id') id: string): Promise<any> {
    const account: Account | null = await this.accountService.one(
      request.user as string,
      id,
    );

    if (account === null)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return {
      layout: 'layouts/main',
      account,
    };
  }

  @Put(':id')
  @Header('Content-type', 'text/vnd.turbo-stream.html')
  @Render('accounts/update')
  async update(
    @Param('id') id: string,
    @Body() accountDto: AccountDto,
    @Req() request: Request,
  ): Promise<any> {
    const account: Account | null = await this.accountService.one(
      request.user as string,
      id,
    );

    if (account === null)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    this.accountService.save(accountDto, account);

    return {
      layout: null,
      account: account,
    };
  }
}

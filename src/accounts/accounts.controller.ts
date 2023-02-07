import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Render,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AccountDto } from 'src/accounts/account.dto';
import { AccountService } from 'src/accounts/account.service';
import { UnauthorizedExceptionFilter } from 'src/auth/exception.filter';
import { SessionGuard } from 'src/auth/session.guard';
import { Account } from 'src/entities/account';

type AccountsT = {
  layout: string | null;
  accounts?: Account[];
  account?: Account;
};

@UseGuards(SessionGuard)
@UseFilters(UnauthorizedExceptionFilter)
@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) {}

  @Get()
  @Render('accounts/index')
  async index(@Req() request: Request): Promise<AccountsT> {
    return {
      layout: 'layouts/main',
      accounts: await this.accountService.all(request.user as string),
    };
  }

  @Get('new')
  @Render('accounts/new')
  async new(): Promise<AccountsT> {
    return {
      layout: 'layouts/main',
      account: new Account(),
    };
  }

  @Get(':id/edit')
  @Render('accounts/edit')
  async edit(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<AccountsT> {
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

  @Post()
  @Header('Content-type', 'text/vnd.turbo-stream.html')
  @Render('accounts/create')
  async create(
    @Body() accountDto: AccountDto,
    @Req() request: Request,
  ): Promise<AccountsT> {
    const account: Account = await this.accountService.new(
      request.user as string,
    );

    if (account === null)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    this.accountService.save(accountDto, account);

    return {
      layout: null,
      account: account,
    };
  }

  @Put(':id')
  @Header('Content-type', 'text/vnd.turbo-stream.html')
  @Render('accounts/update')
  async update(
    @Param('id') id: string,
    @Body() accountDto: AccountDto,
    @Req() request: Request,
  ): Promise<AccountsT> {
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

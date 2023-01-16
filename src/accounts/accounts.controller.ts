import {
  Controller,
  Get,
  Render,
  Param,
  Put,
  Header,
  Body,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import AccountService from './account.service';
import AccountDto from 'src/accounts/account.dto';
import { Account } from 'src/accounts/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) { }

  @UseGuards(AuthGuard('oidc'))
  @Get()
  @Render('accounts/index')
  async index(): Promise<Object> {
    return {
      layout: 'layouts/main',
      accounts: await this.accountService.all(
        'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
      ),
    };
  }

  @Get(':id/edit')
  @Render('accounts/edit')
  async edit(@Param('id') id: string): Promise<Object> {
    const account: Account | null = await this.accountService.one(
      'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
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
  ): Promise<Object> {
    const account: Account | null = await this.accountService.one(
      'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
      id,
    );

    if (account === null)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    this.accountService.save(accountDto, account);

    return {
      account: account,
    };
  }
}

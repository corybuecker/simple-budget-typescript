import { Controller, Get, Render, Param, Put, Header } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) { }

  @Get()
  @Render('accounts/index')
  async index(): Promise<Object> {
    return {
      accounts: await this.accountService.all(
        'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
      ),
    };
  }

  @Get(':id/edit')
  @Render('accounts/edit')
  async edit(@Param('id') id: string): Promise<Object> {
    return {
      account: await this.accountService.one(
        'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
        id,
      ),
    };
  }

  @Put(':id')
  @Header("Content-type", "text/vnd.turbo-stream.html")
  @Render('accounts/update')
  async update(@Param('id') id: string): Promise<Object> {
    return {
      account: await this.accountService.one(
        'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
        id,
      ),
    };
  }
}

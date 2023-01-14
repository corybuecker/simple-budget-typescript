import { Controller, Get, Render } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) {}

  @Get()
  @Render('accounts/index')
  async index(): Promise<Object> {
    return {
      accounts: await this.accountService.all(
        'f70d027f-1250-4ac4-af80-eb3e7a98a8c3',
      ),
    };
  }
}

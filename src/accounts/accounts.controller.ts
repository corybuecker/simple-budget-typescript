import { Controller, Get, Render } from '@nestjs/common';
import { AccountService } from '../account/account.service';

@Controller('accounts')
export class AccountsController {
  constructor(private accountService: AccountService) {}

  @Get()
  @Render('accounts/index')
  index(): Object {
    return { temp: 'Cory' };
  }
}

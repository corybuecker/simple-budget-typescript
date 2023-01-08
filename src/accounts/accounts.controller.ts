import { Controller, Get, Render } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get()
  @Render('accounts/index')
  index(): Object {
    return {};
  }
}

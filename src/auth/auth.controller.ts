import {
  Controller,
  Get,
  UseGuards,
  Request,
  Response
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as TRequest, Response as TResponse } from 'express';
import User from 'src/users/user.entity';
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('oidc'))
  @Get('callback')
  callback(@Request() req: TRequest, @Response() res: TResponse) {
    if (!req.user) throw new Error()
    const user: User = req.user as User

    req.login(user.id, function (err) {
      console.log(err)
      return res.send(req.user)
    });
  }
}

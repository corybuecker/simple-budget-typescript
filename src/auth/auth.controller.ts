import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/entities/user';
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('oidc'))
  @Get('callback')
  callback(@Req() req: Request, @Res() res: Response) {
    if (!req.user) throw new UnauthorizedException();

    const user: User = req.user as User;

    req.login(user.id, function () {
      return res.redirect('/accounts');
    });
  }
}

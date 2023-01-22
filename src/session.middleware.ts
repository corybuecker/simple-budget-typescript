import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { NextFunction, Request, Response } from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
import { Repository } from 'typeorm';
import { Session } from './auth/session.entity';
@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.COOKIE_SECRET === undefined) throw new Error();

    const passportMiddleware = passport.initialize();
    const passportSessionMiddleware = passport.session();

    const sessionMiddleware = session({
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: true,

      store: new TypeormStore().connect(this.sessionRepository),
    });

    sessionMiddleware(req, res, () => {
      passportMiddleware(req, res, () => {
        passportSessionMiddleware(req, res, next);
      });
    });
  }
}

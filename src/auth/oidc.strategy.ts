import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  BaseClient,
  Client,
  Strategy,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  private client: Client;
  constructor(
    private userService: UserService,
    @Inject('OidcClient') client: BaseClient,
  ) {
    const params = { scope: 'openid email' };
    super({ client, params });
    this.client = client;
  }

  async validate(token: TokenSet): Promise<User> {
    const info: UserinfoResponse = await this.client.userinfo(token);
    const { email, email_verified } = info;

    if (email_verified === false) throw new UnauthorizedException();
    if (email === undefined) throw new UnauthorizedException();

    const user: User | null = await this.userService.one(email);
    if (user === null) throw new UnauthorizedException();

    return user;
  }
}

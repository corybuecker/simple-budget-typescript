import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Strategy } from 'openid-client';
import { OidcClient } from "./oidc_client.provider";

@Injectable()
export default class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(private authService: AuthService, client: OidcClient) {
    super({ client })
  }
}

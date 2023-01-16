import { ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthGuard } from '@nestjs/passport';

export default class SessionGuard extends AuthGuard() {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}

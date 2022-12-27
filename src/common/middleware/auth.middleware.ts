import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { AuthService } from '../../modules/auth/auth.service';
import { IUser } from '../../modules/user/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    let auth = req.headers.authorization || req.body._token;
    let token = auth == undefined ? '' : auth.replace(/Bearer /, '');
    let user: IUser | boolean = token
      ? await this.authService.getUserFromToken(token)
      : false;
    if (!user) {
      req.auth = false;
      next();
      return;
    }
    req.user = user;
    req.auth = true;
    next();
  }
}

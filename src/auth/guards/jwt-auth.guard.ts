import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /* We access the routes metadata using the reflector class.Return true 
    if route handler has the decorator @Public, IS_PUBLIC_KEY is found */
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    /* Let Passport's AuthGuard get the token from cookie and compare with the 
    jwt private key (validate) to protect routes with no decorator marked 
    @Public */
    return super.canActivate(context);
  }
}

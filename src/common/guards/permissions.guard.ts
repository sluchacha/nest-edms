import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { USER_PERMISSIONS_KEY } from '../decorators';
/**
 * Permission guard
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   *
   * @param context
   * @returns true if and only if
   * 1) The route handler doesn't have any permissions set
   * 2) The route handler has permissions set and each one is present
   * in the permissions of the jwt access token
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routePermissions = this.reflector.get<string[]>(
      USER_PERMISSIONS_KEY,
      context.getHandler(),
    );

    // No Permissions Set
    if (!routePermissions) return true;

    // Getting the user object
    // prepared by jwt passport strategy
    const { user } = context.switchToHttp().getRequest();

    const userPermissions: any[] = user.permissions;

    // True if it meets all permissions set
    const hasPermissions = () => {
      return routePermissions.every((routePermission) =>
        userPermissions.includes(routePermission),
      );
    };

    return hasPermissions();
  }
}

import { SetMetadata } from '@nestjs/common';

//Create metadata key
export const USER_PERMISSIONS_KEY = 'permissions';

/**Custom decorator to mark a route with permissions.
 * Indicating that it requires certain authorization
 * it is tied to the - PermissionsGuard
 */
export const Permissions = (...permissions: number[]) =>
  SetMetadata(USER_PERMISSIONS_KEY, permissions);

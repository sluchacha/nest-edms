import { SetMetadata } from '@nestjs/common';

//Create metadata key
export const IS_PUBLIC_KEY = 'isPublic';

//Export our decorator
/**Custom decorator to mark a route as public.
 * Indicating that it requires no authentication.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

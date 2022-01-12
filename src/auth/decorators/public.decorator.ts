import { SetMetadata } from '@nestjs/common';

//Create metadata key
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Custom decorator to mark a route as public to bypass JWT Authentication.
 * Indicating that it requires no authentication.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

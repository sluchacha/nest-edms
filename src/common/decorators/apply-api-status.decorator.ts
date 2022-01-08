import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * @summary Pass the ApiResponse code number(s) to get decorators
 * e.g. (400, 401) returns Bad Request and Unauthorized decorators
 * @param args Array of numbers (400, 401)
 * @returns Multiple ApiResponse decorators
 * 200 - Success
 * 201 - Created
 * 204 - No Content
 * 400 - Bad Request
 * 401 - Unauthorized
 * 403 - Forbiden
 * 404 - Not Found
 * 500 - Internal Server Error
 */
export const ApplyApiStatus = (...args: number[]) => {
  const hashMap = {
    200: ApiResponse({ status: 200, description: 'Success' }),
    201: ApiResponse({ status: 201, description: 'Created' }),
    204: ApiResponse({ status: 204, description: 'No Content' }),
    400: ApiResponse({ status: 400, description: 'Bad Request' }),
    401: ApiResponse({ status: 401, description: 'Unauthorized' }),
    403: ApiResponse({ status: 403, description: 'Forbiden' }),
    404: ApiResponse({ status: 404, description: 'Not Found' }),
    500: ApiResponse({ status: 500, description: 'Internal Server Error' }),
  };

  // Get keys to the hashMap
  let mapKeys: number[] = Object.keys(hashMap).map((d) => +d);

  // Return all statuses if there are no args
  if (args.length < 1) args = [...mapKeys];

  const decorators = args
    // Check if the values in args are appropriate keys
    .filter((d) => mapKeys.includes(d))
    // Return the decorator
    .map((d) => hashMap[d]);

  return applyDecorators(...decorators);
};

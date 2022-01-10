import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as Object);

    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Object);

    const errorResponse = {
      ...error,
      timestamp: new Date().toISOString(),
      path: request.url,
      type: typeof exception,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      `HttpExeptionFilter`,
    );

    response.status(status).json(errorResponse);
  }
}
/*
const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toString(),
    });
*/

import { IS_PUBLIC_KEY } from '@auth/decorators';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {
  AppConfiguration,
  InjectAppConfig,
} from '@feature-config/configuration';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);

  constructor(
    private readonly reflector: Reflector,
    @InjectAppConfig() private readonly appConfig: AppConfiguration,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.debug('API_KEY', this.appConfig.apiKey);
    //return true if IS_PUBLIC_KEY is found
    //access the routes metadata using the reflector class
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;

    //Get authorization header and compare with our API_KEY
    //to protect those routes that do not have a decorator of @Public
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Authorization');
    return authHeader === this.appConfig.apiKey; //process.env.API_KEY;
  }
}

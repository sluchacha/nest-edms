import {
  AppConfiguration,
  InjectAppConfig,
} from '@feature-config/configuration';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(@InjectAppConfig() config: AppConfiguration) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.jwtPrivateKey,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies['jwt'];
          if (!data) {
            return undefined;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}

import { AuthService } from '@auth/auth.service';
import { JwtPayload } from '@auth/types';
import {
  AppConfiguration,
  InjectAppConfig,
} from '@feature-config/configuration';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    @InjectAppConfig() config: AppConfiguration,
    private readonly authService: AuthService,
  ) {
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

  async validate(payload: any, done: VerifiedCallback): Promise<any> {
    // We can verify the user in token exists
    const user = await this.authService.validateJwtPayload(payload);

    if (!user) {
      return done(new UnauthorizedException('Invalid Credentials'), false);
    }

    // If the users account has been disabled/is not active
    if (!user?.isActive) {
      return done(
        new UnauthorizedException(
          `Your account has been disabled. Contact your administrator.`,
        ),
        false,
      );
    }

    const data = {
      id: payload.sub,
      name: user.fullName,
      email: user.email,
      role: user.role,
    };

    return done(null, data, payload.iat);
  }
}

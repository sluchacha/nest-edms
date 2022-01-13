import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@auth/auth.service';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserLocal(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    // If the users account has been disabled/is not active
    if (!user?.isActive) {
      throw new UnauthorizedException(
        `Your account has been disabled. Contact your administrator.`,
      );
    }

    return user;
  }
}

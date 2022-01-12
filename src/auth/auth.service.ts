import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@users/entities';
import { UsersService } from '@users/users.service';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserLocal(username: string, password: string): Promise<any> {
    try {
      let user: UserDocument | undefined =
        await this.usersService.findOneByUsername(username);

      // Check supplied password against the hash
      if (!(await user?.validatePassword(password))) {
        return undefined;
      }

      if (!user?.isActive) {
        return undefined;
      }

      user.lastAccessedOn = new Date();
      await user.save();

      const result = _.pick(user, [
        'id',
        'fullName',
        'email',
        'role',
        'isActive',
      ]);

      return result;
    } catch (err) {
      return undefined;
    }
  }

  async login(user: any): Promise<any> {
    const payload = { name: user.fullName, email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

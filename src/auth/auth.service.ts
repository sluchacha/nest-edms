import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as _ from 'lodash';
import { CreateUserDto } from '../users/dto';
import { UserDocument } from '../users/entities';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserLocal(email: string, password: string): Promise<any> {
    try {
      let user: UserDocument | undefined =
        await this.usersService.findOneByEmail(email);

      if (!user) return undefined;

      // Check supplied password against the hash
      if (!(await user?.validatePassword(password))) return undefined;

      // For active users update the last access date
      if (user.isActive) {
        user.lastAccessedOn = new Date();
        await user.save();
      }

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
    const payload: JwtPayload = {
      name: user.fullName,
      email: user.email,
      role: user.role,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(createUserDto);
    return await this.login(user);
  }

  /**
   * @summary Verifies that the payload is valid and the user's account is active/enabled.
   * It is used once the user is logged in and has a JWT token
   * @param {JwtPayload} payload
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof AuthService
   */
  async validateJwtPayload(
    payload: JwtPayload,
  ): Promise<UserDocument | undefined> {
    const user = await this.usersService.findOneById(payload.sub);

    if (!user) return undefined;

    // Update user if their account is active
    if (user.isActive) {
      user.lastAccessedOn = new Date();
      await user.save();
    }

    return user;
  }

  async findOne(id: string) {
    return await this.usersService.findOne(id);
  }
}

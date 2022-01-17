import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategys';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import {
  AppConfiguration,
  appConfiguration,
} from '../feature-config/configuration';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [appConfiguration.KEY],
      useFactory: async (config: AppConfiguration) => {
        return {
          secret: config.jwtPrivateKey,
          signOptions: { expiresIn: config.jwtExpiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfiguration,
  mongoConfiguration,
  multerConfiguration,
} from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, mongoConfiguration, multerConfiguration],
      expandVariables: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class FeatureConfigModule {}

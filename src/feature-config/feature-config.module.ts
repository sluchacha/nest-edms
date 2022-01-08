import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfiguration,
  mongoConfiguration,
  multerConfiguration,
} from 'src/utils-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, mongoConfiguration, multerConfiguration],
    }),
  ],
  providers: [],
  exports: [],
})
export class FeatureConfigModule {}

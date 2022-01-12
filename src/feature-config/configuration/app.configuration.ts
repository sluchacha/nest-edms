import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

// Create a type safe configuration
export const appConfiguration = registerAs('app', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    apiKey: process.env.API_KEY || 'secret_key',
    protocol: process.env.APP_PROTOCOL || 'http',
    host: process.env.APP_HOST || 'localhost',
    port: Number(process.env.APP_PORT) || 3000,
    get domain() {
      return `${this.protocol}://${this.host}:${this.port}`;
    },
  };
});

export type AppConfiguration = ConfigType<typeof appConfiguration>;

// Create helper to inject app config when needed
export const InjectAppConfig = () => Inject(appConfiguration.KEY);

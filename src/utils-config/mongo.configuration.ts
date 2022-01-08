import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const mongoConfiguration = registerAs('mongo', () => {
  return {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGO_DB_NAME || 'nest-edms',
  };
});

export type MongoConfiguration = ConfigType<typeof mongoConfiguration>;
export const InjectMongoConfig = () => Inject(mongoConfiguration.KEY);

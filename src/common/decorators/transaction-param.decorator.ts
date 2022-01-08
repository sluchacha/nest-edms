import { createParamDecorator } from '@nestjs/common';
import * as mongoose from 'mongoose';

export type MongooseClientSession = mongoose.ClientSession;

export const TransactionParam: () => ParameterDecorator = () => {
  return createParamDecorator((_data, req) => {
    return req.transaction;
  });
};

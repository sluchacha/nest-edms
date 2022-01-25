import { Model } from 'mongoose';

// A Mock Model type which represents an object that consists of some of the
// properties that the Model type contains as well. However all these values
// are of type jest.Mock - a mock  function provided by jest
export type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;

// A generic function that returns the newly defined MockModel class
// when the type argument is not provided it falls back to any
export const createMockModel = <T = any>(): MockModel<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
  create: jest.fn(),
});

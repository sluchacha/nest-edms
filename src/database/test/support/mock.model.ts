import { Model } from 'mongoose';

// A Mock Model type which represents an object that consists of some of the
// properties that the Model type contains as well. However all these values
// are of type jest.Mock - a mock  function provided by jest
export type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;

// A generic function that returns the newly defined MockModel class
// when the type argument is not provided it falls back to any
export const createMockModel = <T = any>(
  entityStub: Function,
): MockModel<T> => ({
  find: jest.fn().mockResolvedValue([entityStub()]),
  findOne: jest
    .fn()
    .mockImplementation((entityFilterQuery, projection): { exec: () => T } => {
      return {
        exec: jest.fn().mockResolvedValue(entityStub()),
      };
    }),
  findOneAndRemove: jest.fn().mockResolvedValue(entityStub()),
  findOneAndUpdate: jest.fn().mockResolvedValue(entityStub()),
  findById: jest.fn().mockResolvedValue(entityStub()),
  findByIdAndRemove: jest.fn().mockResolvedValue(entityStub()),
  findByIdAndUpdate: jest.fn().mockResolvedValue(entityStub()),
  create: jest.fn().mockResolvedValue(entityStub()),
  deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
});

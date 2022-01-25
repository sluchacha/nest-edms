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
  create: jest.fn(),
});

export abstract class MockModelForCreate<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  constructorSpy(_createEntityData: T): void {}

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async create(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }
}

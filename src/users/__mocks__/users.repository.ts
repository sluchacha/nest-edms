import { userStub } from '../test/stubs';

export const UsersRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  find: jest.fn().mockResolvedValue([userStub()]),
  findOne: jest.fn().mockResolvedValue(userStub()),
  findById: jest.fn().mockResolvedValue(userStub()),
  findByIdAndUpdate: jest.fn().mockResolvedValue(userStub()),
  findByIdAndRemove: jest.fn().mockResolvedValue(userStub()),
});

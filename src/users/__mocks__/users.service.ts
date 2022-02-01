import { userStub } from '../test/stubs';

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub(), userStub()]),
  findOne: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  remove: jest.fn().mockResolvedValue(userStub()),
});

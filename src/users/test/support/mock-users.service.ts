import { userStub } from '../stubs';

export const mockUsersService = {
  create: jest.fn((dto) =>
    Promise.resolve({
      id: Date.now().toString(),
      ...dto,
    }),
  ),
  findAll: jest.fn(() => [userStub(), userStub()]),
  findOne: jest.fn((id) => {
    const { _id, ...rest } = userStub();
    return Promise.resolve({
      id,
      ...rest,
    });
  }),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn((id) => {
    const { _id, ...rest } = userStub();
    return Promise.resolve({
      id,
      ...rest,
    });
  }),
};

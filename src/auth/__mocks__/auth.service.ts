import { userStub } from '../../users/test/stubs';

export const AuthService = jest.fn().mockReturnValue({
  validateUserLocal: jest.fn().mockResolvedValue(userStub()),
  login: jest.fn().mockResolvedValue({ access_token: 'generated_token' }),
  register: jest.fn().mockResolvedValue({ access_token: 'generated_token' }),
  validateJwtPayload: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockResolvedValue(userStub()),
});

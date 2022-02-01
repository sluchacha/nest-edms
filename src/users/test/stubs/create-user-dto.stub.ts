import { CreateUserDto } from '../../dto';
import { userStub } from './user.stub';

export const createUserDtoStub = (): CreateUserDto => {
  const user = userStub();
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    password_confirm: user.password,
    role: user.role,
  };
};

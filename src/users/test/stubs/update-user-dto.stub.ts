import { UpdateUserDto } from 'src/users/dto';
import { userStub } from './user.stub';

export const updateUserDtoStub = (): UpdateUserDto => {
  const user = userStub();
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

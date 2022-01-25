import { CreateUserDto } from '../../dto';
import { Role } from '../../enums';

export const createUserDtoStub = (): CreateUserDto => {
  return {
    firstName: 'STEPHEN',
    lastName: 'LUCHACHA',
    email: 'luchacha.s@gmail.com',
    password: '12345678',
    password_confirm: '12345678',
    role: Role.ADMIN,
  };
};

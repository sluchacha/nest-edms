import { User } from '../../entities';
import { Role } from '../../enums';

export const userStub = (): User => {
  return {
    _id: '61e2dd4b168ab2b132b39397',
    firstName: 'Stephen',
    lastName: 'Luchacha',
    email: 'luchacha.s@gmail.com',
    password: '12345678',
    role: Role.ADMIN,
    isActive: true,
    lastAccessedOn: new Date('2022-01-29T13:00:00.000Z'),
  };
};

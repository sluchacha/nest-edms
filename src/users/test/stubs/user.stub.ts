import { User } from '../../entities';
import { Role } from '../../enums';
import { Types } from 'mongoose';

export const userStub = (): User => {
  return {
    _id: new Types.ObjectId().toHexString(),
    firstName: 'Stephen',
    lastName: 'Luchacha',
    email: 'luchacha.s@gmail.com',
    password: '12345678',
    role: Role.ADMIN,
    isActive: true,
    lastAccessedOn: new Date(),
    fullName: 'Stephen Luchacha',
  };
};

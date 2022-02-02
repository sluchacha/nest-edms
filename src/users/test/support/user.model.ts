import { User } from '../../entities';
import { createMockModel, MockModel } from '../../../database/test/support';
import { userStub } from '../stubs';

export type UserMockModel = MockModel<User>;

export const UserModel = createMockModel<User>(userStub);

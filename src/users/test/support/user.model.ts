import { MockModelForCreate } from '../../../database/test/support';
import { User } from '../../entities';
import { userStub } from '../stubs';

export class UserModel extends MockModelForCreate<User> {
  protected entityStub = userStub();
}

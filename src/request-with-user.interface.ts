import { Request } from 'express';
import { User } from './users/entities';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;

import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@data-access-dtos/users';
import { Role } from './role.enitity';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string): any {
    /* const user = new User({
      firstName: 'Stephen',
      lastName: 'Luchacha',
      password: 'password',
      role: new Role({ name: 'admin' }),
    });
    // console.log(user);

    return user; */
    return 'User';
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

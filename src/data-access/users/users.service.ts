import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '@data-access-dtos/users';
import { User, UserDocument } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if passwords match
    const { password, password_confirm: confirm, email } = createUserDto;
    if (password !== confirm)
      throw new BadRequestException('Passwords do not match');

    // Check if user exists using email
    const exists = await this.userModel.findOne({ email });
    if (exists)
      throw new BadRequestException('The user already has an account');

    const user = new this.userModel(createUserDto);
    this.logger.debug({ user });
    return await user.register();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOneByCondition(filterCondition: any): Promise<User> {
    return await this.userModel.findOne({ $where: filterCondition });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

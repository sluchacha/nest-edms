import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * @summary Creates a user
   * @param {CreateUserDto} createUserDto user details, the username and email
   * must be unique
   * @returns {Promise<User>} The user with created details or throws an error
   * @throws {BadRequestException} If the user is already registered
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    // Check if user exists using email
    const exists = await this.userModel.findOne({ email }).exec();
    if (exists) throw new BadRequestException('The user is already registered');

    const user = new this.userModel(createUserDto);

    return await user.register();
  }

  /**
   * @summary Gets all registered users
   * @returns {(Promise<User[]>)}
   * @memberof UsersService
   */
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  /**
   * @summary Returns a user by their unique username or undefined
   * @param {string} username username of user, not case sensitive
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof UsersService
   */
  async findOneByUsername(username: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ username }).exec();
    if (user) return user;
    return undefined;
  }

  /**
   * @summary Returns a user by their unique email or undefined
   * @param {string} email email of user, not case sensitive
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof UsersService
   */
  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user) return user;
    return undefined;
  }

  /**
   * @summary Returns a user by their unique id
   * @param {string} id user id
   * @returns {(Promise<User>)}
   * @memberof UsersService
   */
  async findOneById(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findById(id).exec();
    if (user) return user;
    return undefined;
  }

  async findOneByCondition(filterCondition: any): Promise<User> {
    return await this.userModel.findOne({ $where: filterCondition }).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

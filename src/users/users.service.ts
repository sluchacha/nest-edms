import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as dot from 'dot-object';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './entities';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * @summary Creates a user
   * @param {CreateUserDto} createUserDto user details, the email must be unique
   * @returns {Promise<User>} The user with created details
   * @throws {BadRequestException} Throws an error if the user is already registered
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    // Check if user exists using email
    const exists = await this.userModel.findOne({ email }).exec();
    if (exists) throw new BadRequestException('The user is already registered');

    return this.userModel.create(createUserDto);
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
   * @summary Returns a user by their unique email or undefined.
   * Mainly used for authentication
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
   * @summary Returns a user by their unique id.
   * Mainly used for authorization
   * @param {string} id user id
   * @returns {(Promise<UserDocument | undefined>)}
   * @memberof UsersService
   */
  async findOneById(id: string): Promise<UserDocument | undefined> {
    const user = await this.userModel.findById(id).exec();

    if (user) return user;

    return undefined;
  }

  /**
   * @summary Returns a user by their unique id
   * @param {string} id user id
   * @returns {(Promise<User>)} User found
   * @memberof UsersService
   */
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  /**
   * @summary Updates a user with specified id
   * @param {string} id user id
   * @param {UpdateUserDto} updateUserDto  user details to be updated
   * @returns {(Promise<User>)} The updated user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Prepare object to update nested object fields separately
    dot.keepArray = true;
    const tgt = dot.dot(updateUserDto);

    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: tgt }, { new: true })
      .exec();

    if (!user)
      throw new BadRequestException(`The user with the given id was not found`);

    return user;
  }

  /**
   * @summary Delete a user with specified id
   * @param {string} id
   * @returns {(Promise<User>)} The deleted user
   * @todo Check for related records before deleting
   */
  async remove(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndRemove(id).exec();

    if (!user) {
      throw new BadRequestException('The user with the given id was not found');
    }

    return user;
  }
}

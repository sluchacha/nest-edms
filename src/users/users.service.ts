import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as dot from 'dot-object';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './entities';
import { UsersRepository } from './users.repository';

/**
 * @class
 */
@Injectable()
export class UsersService {
  /**
   * Used to log messages
   */
  private readonly logger = new Logger(UsersService.name);

  /**
   * Creates an instance of UsersService
   * @param {UsersRepository} usersRepository - A repository for managing data access to the User Model
   */
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * A method that creates a new user in the database.
   * See the [definition of the CreateUserDto file]{@link CreateUserDto} to
   * see a list of required properties.
   * Example:
   * @example
   * const user = await usersService.create(createUserDto);
   *
   * @param {CreateUserDto} createUserDto - user details. The email must be unique
   * @returns {Promise<User>} A promise with the new user
   * @throws {BadRequestException} If the user is already registered
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;

    // Check if user exists using email
    const exists = await this.usersRepository.findOne({ email });
    if (exists) throw new BadRequestException('The user is already registered');

    return this.usersRepository.create(createUserDto);
  }

  /**
   * A method that fetches the users from the database.
   * Example:
   * @example
   * const users = await usersService.findAll();
   *
   * @returns {Promise<User[]>} A promise with the list of users
   */
  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  /**
   * A method that fetches a single user by their unique email.
   * Example:
   * @example
   * const user = await usersService.findOneByEmail(email);
   *
   * @param {string} email - user email
   * @returns {(Promise<UserDocument | undefined>)} A promise with the user document or undefined
   */
  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    const user = await this.usersRepository.findOne({ email });

    if (user) return user;

    return undefined;
  }

  /**
   * A method that fetches a single user by their unique id.
   * Example:
   * @example
   * const user = await usersService.findOneById(id);
   *
   * @param {string} id - user id. A user with this id should exist in the database
   * @returns {(Promise<UserDocument | undefined>)} A promise with the user document or undefined
   */
  async findOneById(id: string): Promise<UserDocument | undefined> {
    const user = await this.usersRepository.findById(id);

    if (user) return user;

    return undefined;
  }

  /**
   * A method that fetches a single user by their unique id.
   * Example:
   * @example
   * const user = await usersService.findOne(id);
   *
   * @param {string} id - user id. A user with this id should exist in the database
   * @returns {(Promise<User>)} A promise with the user object
   */
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  /**
   * A method that updates a user with the specified id from the database.
   * See the [definition of the UpdateUserDto file]{@link UpdateUserDto} to
   * see a list of required properties.
   * Example:
   * @example
   * const result = await usersService.update(id, updateUserDto);
   *
   * @param {string} id - user id. A user with this id should exist in the database
   * @param {UpdateUserDto} updateUserDto - user details to be updated
   * @returns {Promise<User>} A promise with the updated user
   * @throws {BadRequestException} If the user with the given id was not found
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Prepare object to update nested object fields separately
    dot.keepArray = true;
    const tgt = dot.dot(updateUserDto);

    const user = await this.usersRepository.findByIdAndUpdate(id, tgt);

    if (!user)
      throw new BadRequestException(`The user with the given id was not found`);

    return user;
  }

  /**
   * A method that deletes a user with specified id from the database
   * Example:
   * @example
   * const user = await usersService.remove(id);
   *
   * @param {string} id - user id. A user with this id should exist in the database
   * @returns {(Promise<User>)} A promise with the deleted user
   * @throws {BadRequestException} If the user with the given id was not found
   * @todo Check for related records before deleting
   */
  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findByIdAndRemove(id);

    if (!user) {
      throw new BadRequestException('The user with the given id was not found');
    }

    return user;
  }
}

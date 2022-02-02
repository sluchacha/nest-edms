import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto';
import { User } from './entities';
import { createUserDtoStub, updateUserDtoStub, userStub } from './test/stubs';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import * as dot from 'dot-object';

jest.mock('./users.repository');

jest.mock('dot-object', () => {
  const original = jest.requireActual('dot-object');
  return {
    ...original,
    keepArray: true,
  };
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: UsersRepository;

  beforeAll(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    let user: User;
    let dto!: CreateUserDto;

    beforeEach(() => {
      jest.clearAllMocks();
      user = userStub();
      dto = createUserDtoStub();

      // User with email does not exist
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      // Create user
      jest.spyOn(usersRepository, 'create').mockResolvedValue(user as any);
    });

    it('should call the user model by specifying the user email', async () => {
      expect.assertions(1);
      await usersService.create(dto);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        email: user.email,
      });
    });

    it('should throw the "BadRequestException" when user with specified email exists', async () => {
      // User with email exists
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user as any);

      expect.assertions(2);
      try {
        await usersService.create(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toMatch(/already registered/i);
      }
    });

    it('should return the saved/created user object when user with specified email does not exist', async () => {
      expect.assertions(4);
      const result = await usersService.create(dto);
      expect(usersRepository.create).toBeCalledWith(dto);
      expect(usersRepository.create).toBeCalledTimes(1);
      expect(result).toMatchObject(user);
      expect(result).toHaveProperty('_id', user._id);
    });
  });

  describe('findAll', () => {
    let users: User[];

    beforeEach(async () => {
      jest.clearAllMocks();
      users = [userStub()];

      jest.spyOn(usersRepository, 'find').mockResolvedValue(users as any);
    });

    it('should call the user model', async () => {
      expect.assertions(1);
      await usersService.findAll();
      expect(usersRepository.find).toHaveBeenCalled();
    });

    it('should return a list of users', async () => {
      expect.assertions(2);
      const result = await usersService.findAll();
      expect(result.length).toBe(1);
      expect(
        result.some((u) => u.firstName === users[0].firstName),
      ).toBeTruthy();
    });
  });

  describe('findOneByEmail', () => {
    let user: User;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();

      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user as any);
    });

    it('should call the user model by specifying the user email', async () => {
      expect.assertions(1);
      await usersService.findOneByEmail(user.email);
      expect(usersRepository.findOne).toHaveBeenCalledWith({
        email: user.email,
      });
    });

    it('should return the user object when user with specified email exists', async () => {
      expect.assertions(1);
      const result = await usersService.findOneByEmail(user.email);
      expect(result).toMatchObject(user);
    });

    it('should return undefined when user with specified email does not exist', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);
      expect.assertions(1);
      const result = await usersService.findOneByEmail(user.email);
      expect(result).toBe(undefined);
    });
  });

  describe('findOneById', () => {
    let user: User;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();

      jest.spyOn(usersRepository, 'findById').mockResolvedValue(user as any);
    });

    it('should call the user model by specifying the user id', async () => {
      expect.assertions(1);
      await usersService.findOneById(user._id);
      expect(usersRepository.findById).toHaveBeenCalledWith(user._id);
    });

    it('should return the user object when user with specified id exists', async () => {
      expect.assertions(1);
      const result = await usersService.findOneById(user._id);
      expect(result).toMatchObject(user);
    });

    it('should return undefined when user with specified id does not exist', async () => {
      // User not found
      jest.spyOn(usersRepository, 'findById').mockResolvedValue(null);
      expect.assertions(1);
      const result = await usersService.findOneById(user._id);
      expect(result).toBe(undefined);
    });
  });

  describe('findOne', () => {
    let user: User;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();
      // User found
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user as any);
    });

    it('should call the user model by specifying the user id', async () => {
      expect.assertions(1);
      await usersService.findOne(user._id);
      expect(usersRepository.findOne).toHaveBeenCalledWith({ _id: user._id });
    });

    it('should throw the "NotFoundException" when user with specified id does not exist', async () => {
      // User not found
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      expect.assertions(2);

      try {
        await usersService.findOne(user._id);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toMatch(/not found/i);
      }
    });

    it('should return the user object when user with the specified id exists', async () => {
      expect.assertions(1);
      const result = await usersService.findOne(user._id);
      expect(result).toMatchObject(user);
    });
  });

  describe('update', () => {
    let user: User;
    let userId: string;
    let dto: any;
    let dotSpy: jest.SpyInstance;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();
      userId = user._id;
      dto = updateUserDtoStub();

      dotSpy = jest.spyOn(dot, 'dot').mockReturnValue(dto);

      // User found
      jest
        .spyOn(usersRepository, 'findByIdAndUpdate')
        .mockResolvedValue(user as any);
    });

    it('should convert the dto object to dotted-key/value pair', async () => {
      expect.assertions(1);

      await usersService.update(userId, dto);

      expect(dotSpy).toHaveBeenCalledWith(dto);
    });

    it('should call the user model by specifying the user id and dto', async () => {
      expect.assertions(1);

      await usersService.update(userId, dto);

      expect(usersRepository.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        dto,
      );
    });

    it('should throw the "BadRequestException" when user with specified id does not exist', async () => {
      // User not found
      jest.spyOn(usersRepository, 'findByIdAndUpdate').mockResolvedValue(null);
      expect.assertions(2);
      try {
        await usersService.update(userId, dto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toMatch(/not found/i);
      }
    });

    it('should return the updated user object when user with specified id exists', async () => {
      expect.assertions(1);

      const result = await usersService.update(userId, dto);

      expect(result).toMatchObject(user);
    });
  });

  describe('delete', () => {
    let user: User;
    beforeEach(() => {
      jest.clearAllMocks();
      user = userStub();
      // User found
      jest
        .spyOn(usersRepository, 'findByIdAndRemove')
        .mockResolvedValue(user as any);
    });

    it('should call the user model by specifying the user id', async () => {
      expect.assertions(2);
      let result = await usersService.remove(user._id);
      expect(usersRepository.findByIdAndRemove).toBeCalledWith(user._id);
      expect(result).toMatchObject(user);
    });

    it('should throw the "BadRequestException" when user with specified id does not exist', async () => {
      // No user found
      jest.spyOn(usersRepository, 'findByIdAndRemove').mockResolvedValue(null);
      expect.assertions(2);
      try {
        await usersService.remove(user._id);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toMatch(/not found/i);
      }
    });

    it('should return the deleted user object when user with specified id exists', async () => {
      expect.assertions(1);

      const result = await usersService.remove(user._id);

      expect(result).toMatchObject(user);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

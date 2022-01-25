import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { createMockModel, MockModel } from '../database/test/support';
import { CreateUserDto } from './dto';
import { User } from './entities';
import { userStub } from './test/stubs';
import { UsersService } from './users.service';
import * as dot from 'dot-object';

jest.mock('dot-object', () => {
  const original = jest.requireActual('dot-object');
  return {
    ...original,
    keepArray: true,
  };
});

describe('UsersService', () => {
  let service: UsersService;
  let userModel: MockModel<User>;

  beforeAll(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(User.name),
          useValue: createMockModel<User>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<MockModel<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let user: User;
    let dto!: CreateUserDto;

    beforeEach(() => {
      jest.clearAllMocks();
      user = userStub();
      const { _id, ...rest } = user;
      dto = { ...rest, password_confirm: rest.password };

      // User with email does not exist
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      // Create user
      jest.spyOn(userModel, 'create').mockImplementation((): any => {
        return user;
      });
    });

    it('should call the user model by specifying the user email', async () => {
      expect.assertions(1);
      await service.create(dto);
      expect(userModel.findOne).toBeCalledWith({ email: user.email });
    });

    it('should throw the "BadRequestException" when user with specified email exists', async () => {
      // User with email exists
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      } as any);

      expect.assertions(2);
      try {
        await service.create(dto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toMatch(/already registered/i);
      }
    });

    it('should return the saved/created user object when user with specified email does not exist', async () => {
      expect.assertions(4);
      const result = await service.create(dto);
      expect(userModel.create).toBeCalledWith(dto);
      expect(userModel.create).toBeCalledTimes(1);
      expect(result).toMatchObject(user);
      expect(result).toHaveProperty('_id', user._id);
    });
  });

  describe('findAll', () => {
    let users: User[];

    beforeEach(async () => {
      jest.clearAllMocks();
      users = [userStub()];

      jest.spyOn(userModel, 'find').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(users),
        };
      });
    });

    it('should call the user model', async () => {
      expect.assertions(1);
      await service.findAll();
      expect(userModel.find).toHaveBeenCalled();
    });

    it('should return a list of users', async () => {
      expect.assertions(2);
      const result = await service.findAll();
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

      jest.spyOn(userModel, 'findOne').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        };
      });
    });

    it('should call the user model by specifying the user email', async () => {
      expect.assertions(1);
      await service.findOneByEmail(user.email);
      expect(userModel.findOne).toHaveBeenCalledWith({ email: user.email });
    });

    it('should return the user object when user with specified email exists', async () => {
      expect.assertions(1);
      const result = await service.findOneByEmail(user.email);
      expect(result).toMatchObject(user);
    });

    it('should return undefined when user with specified email does not exist', async () => {
      jest.spyOn(userModel, 'findOne').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(null),
        };
      });
      expect.assertions(1);
      const result = await service.findOneByEmail(user.email);
      expect(result).toBe(undefined);
    });
  });

  describe('findOneById', () => {
    let user: User;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();

      jest.spyOn(userModel, 'findById').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        };
      });
    });

    it('should call the user model by specifying the user id', async () => {
      expect.assertions(1);
      await service.findOneById(user._id);
      expect(userModel.findById).toHaveBeenCalledWith(user._id);
    });

    it('should return the user object when user with specified id exists', async () => {
      expect.assertions(1);
      const result = await service.findOneById(user._id);
      expect(result).toMatchObject(user);
    });

    it('should return undefined when user with specified id does not exist', async () => {
      // User not found
      jest.spyOn(userModel, 'findById').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(null),
        };
      });
      expect.assertions(1);
      const result = await service.findOneById(user._id);
      expect(result).toBe(undefined);
    });
  });

  describe('findOne', () => {
    let user: User;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();
      // User found
      jest.spyOn(userModel, 'findOne').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        };
      });
    });

    it('should call the user model by specifying the user id', async () => {
      expect.assertions(1);
      await service.findOne(user._id);
      expect(userModel.findOne).toHaveBeenCalledWith({ _id: user._id });
    });

    it('should throw the "NotFoundException" when user with specified id does not exist', async () => {
      // User not found
      jest.spyOn(userModel, 'findOne').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(null),
        };
      });

      expect.assertions(2);

      try {
        await service.findOne(user._id);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toMatch(/not found/i);
      }
    });

    it('should return the user object when user with the specified id exists', async () => {
      expect.assertions(1);
      const result = await service.findOne(user._id);
      expect(result).toMatchObject(user);
    });
  });

  describe('update', () => {
    let user: User;
    let userId!: string;
    let dto!: any;
    let dotSpy!: jest.SpyInstance;

    beforeEach(async () => {
      jest.clearAllMocks();
      user = userStub();
      let { _id, ...rest } = user;
      userId = _id;
      dto = rest;

      dotSpy = jest.spyOn(dot, 'dot').mockReturnValue(dto);

      // User found
      jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        };
      });
    });

    it('should convert the dto object to dotted-key/value pair', async () => {
      expect.assertions(1);

      await service.update(userId, dto);

      expect(dotSpy).toHaveBeenCalledWith(dto);
    });

    it('should call the user model by specifying the user id and dto', async () => {
      expect.assertions(1);

      await service.update(userId, dto);

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        { $set: dto },
        { new: true },
      );
    });

    it('should throw the "BadRequestException" when user with specified id does not exist', async () => {
      // User not found
      jest.spyOn(userModel, 'findByIdAndUpdate').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(null),
        };
      });
      expect.assertions(2);
      try {
        await service.update(userId, dto);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toMatch(/not found/i);
      }
    });

    it('should return the updated user object when user with specified id exists', async () => {
      expect.assertions(1);

      const result = await service.update(userId, dto);

      expect(result).toMatchObject(user);
    });
  });

  describe('delete', () => {
    let user: User;
    beforeEach(() => {
      jest.clearAllMocks();
      user = userStub();
      // User found
      jest.spyOn(userModel, 'findByIdAndRemove').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        };
      });
    });

    it('should call the user model by specifying the user id', async () => {
      expect.assertions(2);
      let result = await service.remove(user._id);
      expect(userModel.findByIdAndRemove).toBeCalledWith(user._id);
      expect(result).toMatchObject(user);
    });

    it('should throw the "BadRequestException" when user with specified id does not exist', async () => {
      // No user found
      jest.spyOn(userModel, 'findByIdAndRemove').mockImplementation((): any => {
        return {
          exec: jest.fn().mockResolvedValue(null),
        };
      });
      expect.assertions(2);
      try {
        await service.remove(user._id);
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
        expect(err.message).toMatch(/not found/i);
      }
    });

    it('should return the deleted user object when user with specified id exists', async () => {
      expect.assertions(1);

      const result = await service.remove(user._id);

      expect(result).toMatchObject(user);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});

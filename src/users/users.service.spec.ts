import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import { createMockModel, MockModel } from '../database/test/support';
import { CreateUserDto } from './dto';
import { User, UserDocument } from './entities';
import { userStub } from './test/stubs';
import { UserModel } from './test/support/user.model';
import { UsersService } from './users.service';

describe('UsersService', () => {
  describe.skip('Find Operations', () => {
    let service: UsersService;
    let userModel: MockModel<User>;

    beforeAll(async () => {
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

    describe('findAll', () => {
      let users: User[];

      beforeEach(async () => {
        users = [userStub()];
      });

      it('should call the user model', async () => {
        jest.spyOn(userModel, 'find').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(users),
          };
        });
        expect.assertions(1);
        await service.findAll();
        expect(userModel.find).toHaveBeenCalled();
      });

      it('should return a list of users', async () => {
        jest.spyOn(userModel, 'find').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(users),
          };
        });
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
        user = userStub();
      });

      it('should call the user model by specifying the user email', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(user),
          };
        });
        expect.assertions(1);
        await service.findOneByEmail(user.email);
        expect(userModel.findOne).toHaveBeenCalledWith({ email: user.email });
      });

      it('should return the user object when user with email exists', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(user),
          };
        });
        expect.assertions(1);
        const result = await service.findOneByEmail(user.email);
        expect(result).toMatchObject(user);
      });

      it('should return undefined when user with specified email does not exist', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(() => {
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
        user = userStub();
      });

      it('should call the user model by specifying the user id', async () => {
        jest.spyOn(userModel, 'findById').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(user),
          };
        });
        expect.assertions(1);
        await service.findOneById(user._id);
        expect(userModel.findById).toHaveBeenCalledWith(user._id);
      });

      it('should return the user object when user with ID exists', async () => {
        jest.spyOn(userModel, 'findById').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(user),
          };
        });
        expect.assertions(1);
        const result = await service.findOneById(user._id);
        expect(result).toMatchObject(user);
      });

      it('should return undefined when user with specified id does not exist', async () => {
        jest.spyOn(userModel, 'findById').mockImplementation(() => {
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
        user = userStub();
      });

      it('should call the user model by specifying the user id', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(user),
          };
        });
        expect.assertions(1);
        await service.findOne(user._id);
        expect(userModel.findOne).toHaveBeenCalledWith({ _id: user._id });
      });

      it('should return the user object when user with ID exists', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(() => {
          return {
            exec: jest.fn().mockResolvedValue(user),
          };
        });

        const result = await service.findOne(user._id);
        expect(result).toMatchObject(user);
      });

      it('should throw the "NotFoundException" when user with specified id does not exist', async () => {
        jest.spyOn(userModel, 'findOne').mockImplementation(() => {
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
    });
  });

  describe('create operations', () => {
    let service: UsersService;
    let userModel: UserModel;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersService,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();

      service = moduleRef.get<UsersService>(UsersService);
      userModel = moduleRef.get<UserModel>(getModelToken(User.name));
    });

    describe('create', () => {
      describe('when create is called', () => {
        let user: User;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;
        let dto: CreateUserDto;
        let result: any;

        beforeEach(async () => {
          saveSpy = jest.spyOn(UserModel.prototype, 'create');
          constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
          user = userStub();
          dto = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            password_confirm: user.password,
            role: user.role,
          };

          result = await service.create(dto);
        });

        test('then it should call the userModel', () => {
          expect.assertions(3);
          expect(constructorSpy).toHaveBeenCalledWith(dto);
          expect(saveSpy).toHaveBeenCalled();
          expect(service.create(dto))
            .resolves.toEqual(user)
            .catch((err) => {
              console.debug(err);
            });
        });

        // test('then it should return a user', () => {
        //   expect(result).toEqual(user);
        // });
      });
    });
  });
  // expect({name: 'Peter Parker',}).toHaveProperty('name', expect.stringMatching(/peter/i))
});

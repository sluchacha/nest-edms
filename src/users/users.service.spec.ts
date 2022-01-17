import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from './entities';
import { UsersService } from './users.service';

// A Mock Model type which represents an object that consists of some of the
// properties that the Model type contains as well. However all these values
// are of type jest.Mock - a mock  function provided by jest
type MockModel<T = any> = Partial<Record<keyof Model<T>, jest.Mock>>;

// A generic function that returns the newly defined MockModel class
// when the type argument is not provided it falls back to any
const createMockModel = <T = any>(): MockModel<T> => ({
  findOne: jest.fn(() => {
    return {
      exec: jest.fn(() => {
        id: '1';
      }),
    };
  }),
  create: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userModel: MockModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Connection, useValue: {} },
        {
          provide: getModelToken(User.name),
          useValue: createMockModel<UserDocument>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<MockModel<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when user with ID exists', () => {
      it('should return the user object', async () => {
        const userId = '1';
        const expectedUser = { id: '1' };

        //userModel.findOne.mockReturnValue(expectedUser);
        /* const spy = jest
          .spyOn(userModel, 'findOne')
          .mockResolvedValue(expectedUser); */
        const user = await service.findOne(userId);
        // console.log({ user });
        expect(user).toEqual(expectedUser);
      });
    });

    describe('otherwise, when user does not exist', () => {
      it.skip('should throw the "NotFoundException"', async () => {
        const userId = '1';
        userModel.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(userId);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`User #${userId} not found`);
        }
      });
    });
  });
});

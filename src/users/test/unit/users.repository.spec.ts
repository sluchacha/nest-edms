import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { string } from 'joi';
import { FilterQuery } from 'mongoose';
import { User } from '../../entities';
import { UsersRepository } from '../../users.repository';
import { createUserDtoStub, updateUserDtoStub, userStub } from '../stubs';
import { UserMockModel, UserModel } from '../support/user.model';

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;
  let userModel: UserMockModel;
  let userFilterQuery: FilterQuery<User>;

  beforeAll(async () => {
    const token = getModelToken(User.name);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: token,
          useValue: UserModel,
        },
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
    userModel = module.get<UserMockModel>(token);
    userFilterQuery = { id: userStub()._id };

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('find', () => {
    describe('when find is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersRepository.find(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.find).toHaveBeenCalledWith(userFilterQuery);
      });

      test('then it should return a list of users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersRepository.findOne(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findOne).toHaveBeenCalledWith(userFilterQuery, {
          _id: 0,
          __v: 0,
        });
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOneAndRemove', () => {
    describe('when findOneAndRemove is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersRepository.findOneAndRemove(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findOneAndRemove).toHaveBeenCalledWith(
          userFilterQuery,
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findOneAndUpdate', () => {
    describe('when findOneAndUpdate is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersRepository.findOneAndUpdate(
          userFilterQuery,
          updateUserDtoStub(),
        );
      });

      test('then it should call the userModel', () => {
        expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
          userFilterQuery,
          updateUserDtoStub(),
          { new: true },
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findById', () => {
    describe('when findById is called', () => {
      let user: User;
      let id: string;

      beforeEach(async () => {
        id = userStub()._id;
        user = await usersRepository.findById(id);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findById).toHaveBeenCalledWith(id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findByIdAndRemove', () => {
    describe('when findByIdAndRemove is called', () => {
      let user: User;
      let id: string;

      beforeEach(async () => {
        id = userStub()._id;
        user = await usersRepository.findByIdAndRemove(id);
      });

      test('then it should call the userModel', () => {
        expect(userModel.findByIdAndRemove).toHaveBeenCalledWith(id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('findByIdAndUpdate', () => {
    describe('when findByIdAndUpdate is called', () => {
      let user: User;
      let id: string;

      beforeEach(async () => {
        id = userStub()._id;
        user = await usersRepository.findByIdAndUpdate(id, updateUserDtoStub());
      });

      test('then it should call the userModel', () => {
        expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
          id,
          updateUserDtoStub(),
          { new: true },
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersRepository.create(createUserDtoStub());
      });

      test('then it should call the userModel', () => {
        expect(userModel.create).toHaveBeenCalledWith(createUserDtoStub());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('deleteMany', () => {
    describe('when deleteMany is called', () => {
      let isDeleted: Boolean;

      beforeEach(async () => {
        isDeleted = await usersRepository.deleteMany(userFilterQuery);
      });

      test('then it should call the userModel', () => {
        expect(userModel.deleteMany).toHaveBeenCalledWith(userFilterQuery);
      });

      test('then it should return a user', () => {
        expect(isDeleted).toBeTruthy();
      });
    });
  });
});

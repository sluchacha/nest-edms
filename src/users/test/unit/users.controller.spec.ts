import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../entities/user.entity';
import { createUserDtoStub, updateUserDtoStub, userStub } from '../stubs';
import { UsersController } from '../../users.controller';
import { UsersService } from '../../users.service';
import { CreateUserDto, UpdateUserDto } from '../../dto';

jest.mock('../../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    describe('when create is called', () => {
      let user: User;
      let stub: User;
      let dto: CreateUserDto;

      beforeEach(async () => {
        stub = userStub();
        dto = createUserDtoStub();
        user = await usersController.create(dto);
      });

      test('then it should call UserService', () => {
        expect(usersService.create).toHaveBeenCalledWith(dto);
      });

      test('then it should return a user', async () => {
        expect(user).toEqual(stub);
      });
    });
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let users: User[];
      let stub: User;

      beforeEach(async () => {
        stub = userStub();
        users = await usersController.findAll();
      });

      test('then it should call UsersService', async () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });

      test('then it should return a list of users', async () => {
        expect(users.length).toBe(2);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;
      let stub: User;

      beforeEach(async () => {
        stub = userStub();
        user = await usersController.findOne(stub._id);
      });

      test('then it should call UsersService', async () => {
        expect(usersService.findOne).toHaveBeenCalledWith(stub._id);
      });

      test('then it should return a user', async () => {
        expect(user).toEqual(stub);
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let user: User;
      let stub: User;
      let dto: UpdateUserDto;

      beforeEach(async () => {
        stub = userStub();
        dto = updateUserDtoStub();
        user = await usersController.update(stub._id, dto);
      });

      test('then it should call UsersService', async () => {
        expect(usersService.update).toHaveBeenCalledWith(stub._id, dto);
      });

      test('then it should return a user', async () => {
        expect(user).toEqual(stub);
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      let user: User;
      let stub: User;

      beforeEach(async () => {
        stub = userStub();
        user = await usersController.remove(stub._id);
      });

      test('then it should call UsersService', async () => {
        expect(usersService.remove).toHaveBeenCalledWith(stub._id);
      });

      test('then it should return a user', async () => {
        expect(user).toEqual(stub);
      });
    });
  });
});

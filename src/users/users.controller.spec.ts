import { Test, TestingModule } from '@nestjs/testing';
import { createUserDtoStub, updateUserDtoStub } from './test/stubs';
import { mockUsersService } from './test/support';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect.assertions(2);
    const dto = createUserDtoStub();
    const result = await controller.create(dto);
    expect(result).toEqual({
      id: expect.any(String),
      ...dto,
    });
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });

  it('should find all users', async () => {
    expect.assertions(2);
    const result = await controller.findAll();
    expect(result.length).toBe(2);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should find a single user', async () => {
    expect.assertions(2);
    const result = await controller.findOne('1');
    expect(result).toHaveProperty('id', '1');
    expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    expect.assertions(2);
    const dto = updateUserDtoStub();
    const result = await controller.update('1', dto);
    expect(result).toEqual({
      id: '1',
      ...dto,
    });
    expect(mockUsersService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a user', async () => {
    expect.assertions(2);
    const result = await controller.remove('1');
    expect(result).toHaveProperty('id', '1');
    expect(mockUsersService.remove).toHaveBeenCalledWith('1');
  });
});

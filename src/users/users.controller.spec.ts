import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './enums';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// jest.useRealTimers();
describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: Date.now().toString(),
        ...dto,
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  /* it('should be defined', () => {
    expect(controller).toBeDefined();
  }); */

  it('should create a user', async () => {
    jest.setTimeout(30000);
    //"testTimeout": 90000 in jest config
    //jest.useFakeTimers('legacy')
    const dto = {
      firstName: 'STEPHEN',
      lastName: 'LUCHACHA',
      email: 'luchacha.s@gmail.com',
      password: '12345678',
      password_confirm: '12345678',
      role: Role.ADMIN,
    };

    expect(await controller.create(dto)).toEqual({
      id: expect.any(String),
      ...dto,
    });

    // expect(mockUsersService.create).toHaveBeenCalled();
  });
});

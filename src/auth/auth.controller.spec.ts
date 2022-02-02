import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../users/dto';
import { createUserDtoStub } from '../users/test/stubs';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

jest.mock('./auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  /* describe('register', () => {
    describe('when register is called', () => {
      let result: any;
      let dto: CreateUserDto;

      beforeEach(async () => {
        dto = createUserDtoStub();
        await authController.register(dto);
      });
      test('then it should call the AuthService', () => {});
    });
  }); */
});

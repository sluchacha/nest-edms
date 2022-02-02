import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/entities';
import { createUserDtoStub, userStub } from '../users/test/stubs';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtPayload } from './types';
import * as _ from 'lodash';

jest.mock('../users/users.service');
jest.mock('@nestjs/jwt', () => {
  const original = jest.requireActual('@nestjs/jwt');
  return {
    ...original,
    JwtService: jest.fn().mockReturnValue({
      sign: jest.fn().mockReturnValue('generated_token'),
    }),
  };
});

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUserLocal', () => {
    describe('when validateUserLocal is called ', () => {
      describe('and the user is matched', () => {
        let result: any;
        let user: User;
        let lodashSpy: jest.SpyInstance;

        beforeEach(async () => {
          jest.clearAllMocks();
          user = userStub();
          jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
            ...user,
            validatePassword: jest.fn().mockResolvedValue(true),
            save: jest.fn().mockResolvedValue(true),
          } as any);

          lodashSpy = jest.spyOn(_, 'pick').mockReturnValue(user);

          result = await authService.validateUserLocal(
            user.email,
            user.password,
          );
        });

        test('then it should call the UsersService', async () => {
          result = await authService.validateUserLocal(
            user.email,
            user.password,
          );
          expect(usersService.findOneByEmail).toHaveBeenCalledWith(user.email);
        });

        test('then it should call the lodash pick function', async () => {
          expect(lodashSpy).toHaveBeenCalled();
        });

        test('then it should return the user', async () => {
          expect(result).toBeTruthy();
        });

        describe('and the password is invalid', () => {
          beforeEach(async () => {
            jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
              ...user,
              validatePassword: jest.fn().mockResolvedValue(false),
            } as any);

            result = await authService.validateUserLocal(
              user.email,
              user.password,
            );
          });
          test('then it should return undefined', () => {
            expect(result).toEqual(undefined);
          });
        });

        describe('and the validatePassword function throws an error', () => {
          beforeEach(async () => {
            jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue({
              ...user,
              validatePassword: jest.fn(() => {
                throw new Error('UNKNOWN');
              }),
            } as any);
          });
          test('then it should return undefined', async () => {
            try {
              await authService.validateUserLocal(user.email, user.password);
            } catch (err) {
              expect(err).toBeInstanceOf(Error);
              expect(err.message).toMatch(/unknown/i);
            }
          });
        });
      });

      describe('and the user is not matched', () => {
        let result: any;
        let user: User;

        beforeEach(async () => {
          jest.clearAllMocks();
          user = userStub();
          jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

          result = await authService.validateUserLocal(
            user.email,
            user.password,
          );
        });

        test('then it should return undefined', () => {
          expect(result).toEqual(undefined);
        });
      });
    });
  });

  describe('login', () => {
    describe('when login is called', () => {
      let user: User;
      let result: any;

      beforeEach(async () => {
        user = userStub();
        result = await authService.login(user);
      });

      test('then it should call the JwtService', async () => {
        expect(jwtService.sign).toHaveBeenCalled();
      });

      test('then it should return a token', async () => {
        expect(result).toHaveProperty('access_token', 'generated_token');
      });
    });
  });

  describe('register', () => {
    describe('when register is called', () => {
      let dto: CreateUserDto;
      let result: any;

      beforeEach(async () => {
        dto = createUserDtoStub();
        result = await authService.register(dto);
      });

      test('then it should call the UsersService', () => {
        expect(usersService.create).toHaveBeenCalledWith(dto);
      });

      test('then it should return a token', () => {
        expect(result).toHaveProperty('access_token', 'generated_token');
      });
    });
  });

  describe('validateJwtPayload', () => {
    describe('when validateJwtPayload is called', () => {
      let payload: JwtPayload;

      beforeEach(() => {
        const user = userStub();
        payload = {
          email: user.email,
          name: user.firstName,
          role: user.role,
          sub: user._id,
        };
      });

      describe('and the user is matched', () => {
        let user: User;
        let result: any;

        beforeEach(async () => {
          user = userStub();
          jest.spyOn(usersService, 'findOneById').mockResolvedValue({
            ...user,
            save: jest.fn().mockResolvedValue(user),
          } as any);

          result = await authService.validateJwtPayload(payload);
        });

        test('then it should call the usersService', () => {
          expect(usersService.findOneById).toHaveBeenCalledWith(payload.sub);
        });

        test('then it should return a user', () => {
          expect(result).toBeTruthy();
        });
      });

      describe('and the user is not matched', () => {
        let result: any;

        beforeEach(async () => {
          jest.spyOn(usersService, 'findOneById').mockResolvedValue(null);
          result = await authService.validateJwtPayload(payload);
        });

        test('then it should return undefined', () => {
          expect(result).toBe(undefined);
        });
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let user: User;
      let result: any;

      beforeEach(async () => {
        user = userStub();
        result = await authService.findOne(user._id);
      });

      test('then it should call UsersService', () => {
        expect(usersService.findOne).toHaveBeenCalledWith(user._id);
      });
      test('then it should return a user', () => {
        expect(result).toBeTruthy();
      });
    });
  });
});

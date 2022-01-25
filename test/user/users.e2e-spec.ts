import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../src/users/entities';
import { createMockModel, MockModel } from '../../src/database/test/support';
import { userStub } from '../../src/users/test/stubs';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let UserModel: MockModel<User>;

  beforeAll(async () => {
    UserModel = createMockModel<User>();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(UserModel)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    const user = userStub();
    jest.spyOn(UserModel, 'find').mockImplementation(() => {
      return {
        exec: jest.fn().mockResolvedValue([{ ...user, id: user._id }]),
      };
    });
    return request(app.getHttpServer())
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          lastAccessedOn: user.lastAccessedOn.toISOString(),
        },
      ]);
  });
});

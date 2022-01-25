import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../src/users/users.module';
import { Role } from '../../src/users/enums';
import * as request from 'supertest';
import { CreateUserDto } from '../../src/users/dto';

describe('[Feature] Users - /users', () => {
  const user = {
    firstName: 'STEPHEN',
    lastName: 'LUCHACHA',
    email: 'luchacha.s@gmail.com',
    password: '12345678',
    password_confirm: '12345678',
    role: Role.ADMIN,
  };
  let app: INestApplication;
  let uri: string =
    'mongodb+srv://example:example12345@cluster0.0ngty.mongodb.net/test-nest-edms?retryWrites=true&w=majority&ssl=true';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, MongooseModule.forRoot(uri)],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(user as CreateUserDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedUser = jasmine.objectContaining({
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: user.role,
          isActive: true,
        });
        expect(body).toEqual(expectedUser);
      });
  });
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [Delete /:id]');

  afterAll(async () => {
    await app.close();
  });
});

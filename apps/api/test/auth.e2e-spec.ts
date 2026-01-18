import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { prismaMock } from './mocks/prisma.mock';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.JWT_SECRET = 'test-secret';
    process.env.JWT_EXPIRES_IN = '5m';
    process.env.DEMO_USER = 'guardian';
    process.env.DEMO_PASS = 'onboarding_pass';

    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/login returns accessToken', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'guardian', password: 'onboarding_pass' })
      .expect(201);

    expect(res.body).toHaveProperty('accessToken');
    expect(typeof res.body.accessToken).toBe('string');
    expect(res.body.accessToken.length).toBeGreaterThan(10);
  });

  it('POST /auth/login (401) with invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'ward', password: 'board' })
      .expect(401);
  });

  it('POST /auth/login (400) with missing fields', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'guardian' })
      .expect(400);
  });
});

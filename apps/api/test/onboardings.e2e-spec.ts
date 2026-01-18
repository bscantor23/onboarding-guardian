import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { ONBOARDING_SELECT } from '../src/onboardings/selects/onboarding.select';

describe('Onboarding (e2e)', () => {
  let app: INestApplication;
  let jwt: JwtService;

  const prismaMock = {
    onboarding: {
      create: jest.fn(),
    },
  };

  beforeAll(async () => {
    process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'sbx-secret';
    process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '5m';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleRef.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    jwt = app.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  const makeToken = () => {
    return jwt.sign({ sub: 'test-user', username: 'test-user' });
  };

  it('POST /onboarding (401) if there is no token', async () => {
    await request(app.getHttpServer())
      .post('/onboarding')
      .send({
        fullName: 'Camilo Rodriguez',
        document: '12345',
        email: 'camilo@test.com',
        initialAmount: '1000.00',
      })
      .expect(401);
  });

  it('POST /onboarding (400) if the body is invalid (with token)', async () => {
    const token = makeToken();

    await request(app.getHttpServer())
      .post('/onboarding')
      .set('Authorization', `Bearer ${token}`)
      .send({
        fullName: 'Ca',
        document: '12345',
        email: 'email',
        initialAmount: 'abc',
      })
      .expect(400);

    expect(prismaMock.onboarding.create).not.toHaveBeenCalled();
  });

  it('POST /onboarding (201) and persists normalized data', async () => {
    const token = makeToken();

    prismaMock.onboarding.create.mockResolvedValue({
      id: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });

    const payload = {
      fullName: 'camilo rodriguez',
      document: 'ab123',
      email: 'CAMILO@TEST.COM',
      initialAmount: '1000.00',
    };

    const response = await request(app.getHttpServer())
      .post('/onboarding')
      .set('Authorization', `Bearer ${token}`)
      .send(payload)
      .expect((r) => {
        if (![201].includes(r.status)) {
          throw new Error(`Expected 201, got ${r.status}`);
        }
      });

    expect(response.body).toEqual({
      onboardingId: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });

    expect(prismaMock.onboarding.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.onboarding.create).toHaveBeenCalledWith({
      data: {
        fullName: 'CAMILO RODRIGUEZ',
        document: 'AB123',
        email: 'camilo@test.com',
        initialAmount: '1000.00',
        status: 'REQUESTED',
      },
      select: ONBOARDING_SELECT,
    });
  });
});

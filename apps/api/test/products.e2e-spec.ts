import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Products (e2e)', () => {
  let app: INestApplication;

  const product1 = {
    id: '7a2ee364-0d4a-4012-a5bb-495f78a957a4',
    code: 'SAV_BASIC',
    name: 'Ahorros Básica',
    description: null,
    active: true,
    minAmount: '0',
    maxAmount: '50000000',
    currency: {
      id: '0d7dd938-7e62-4abe-8da6-e5c5af15109c',
      code: 'COP',
      name: 'Peso colombiano',
      symbol: '$',
      decimals: 2,
    },
    type: {
      id: 'e82fac83-d803-426b-af4a-b4fe86f5b641',
      code: 'SAV',
      name: 'Cuenta de Ahorros',
      description: 'Producto de ahorro',
    },
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  const product2 = {
    id: '9400e866-579a-43fc-a125-6bd6569c5fea',
    code: 'CHK_USD',
    name: 'Corriente USD',
    description: 'Cuenta corriente en dólares',
    active: true,
    minAmount: '10',
    maxAmount: '100000',
    currency: {
      id: '104cfd0d-ae14-483b-8d45-6a56484b5398',
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      decimals: 2,
    },
    type: {
      id: 'fcdbbf24-f46d-443c-b2b3-1e336e590948',
      code: 'CHK',
      name: 'Cuenta Corriente',
      description: 'Producto transaccional',
    },
    createdAt: new Date('2026-01-02T00:00:00.000Z'),
    updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  };

  const prismaMock = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeAll(async () => {
    prismaMock.product.findMany.mockResolvedValue([product2, product1]);

    prismaMock.product.findUnique.mockImplementation(async (args: any) => {
      const id = args?.where?.id;
      if (id === '7a2ee364-0d4a-4012-a5bb-495f78a957a4') return product1;
      if (id === '9400e866-579a-43fc-a125-6bd6569c5fea') return product2;
      return null;
    });

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /products (200) and returns list', async () => {
    const res = await request(app.getHttpServer()).get('/products').expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0].id).toBe('9400e866-579a-43fc-a125-6bd6569c5fea');
    expect(res.body[1].id).toBe('7a2ee364-0d4a-4012-a5bb-495f78a957a4');

    expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
  });

  it('GET /products/:id (200) and returns product', async () => {
    const res = await request(app.getHttpServer())
      .get('/products/7a2ee364-0d4a-4012-a5bb-495f78a957a4')
      .expect(200);

    expect(res.body.id).toBe('7a2ee364-0d4a-4012-a5bb-495f78a957a4');
    expect(res.body.code).toBe('SAV_BASIC');
    expect(res.body.currency.code).toBe('COP');

    expect(prismaMock.product.findUnique).toHaveBeenCalled();
  });

  it('GET /products/:id (404) when not found', async () => {
    const res = await request(app.getHttpServer())
      .get('/products/b9283b9a-2067-4e72-91f1-54a640971658')
      .expect(404);

    expect(res.body).toMatchObject({
      statusCode: 404,
      message: 'Product not found',
      error: 'Not Found',
    });
  });
});

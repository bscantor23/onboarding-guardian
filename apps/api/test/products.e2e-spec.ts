import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Products (e2e)', () => {
  let app: INestApplication;

  const productIndividual1 = {
    id: '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f',
    code: 'SAV_BASIC',
    name: 'Ahorros Básica',
    headline: 'Beneficios para tu día a día',
    audienceType: 'BOTH',
    type: {
      id: '8198c128-4345-42e1-895b-05f74339073d',
      code: 'SAV',
      name: 'Cuenta de Ahorros',
      description: 'Producto de ahorro',
    },
    currency: {
      id: '061eaa15-6333-4ca8-9bc6-73d9d7c18c06',
      code: 'COP',
      name: 'Peso colombiano',
      symbol: '$',
      decimals: 2,
    },
    minAmount: '0',
    maxAmount: '50000000',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const product1 = {
    id: '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f',
    code: 'SAV_BASIC',
    name: 'Ahorros Básica',
    headline: 'Beneficios para tu día a día',
    term: '360 días',
    audienceType: 'BOTH',
    rateType: 'EA',
    rate: '10',
    type: {
      id: '8198c128-4345-42e1-895b-05f74339073d',
      code: 'SAV',
      name: 'Cuenta de Ahorros',
      description: 'Producto de ahorro',
    },
    currency: {
      id: '061eaa15-6333-4ca8-9bc6-73d9d7c18c06',
      code: 'COP',
      name: 'Peso colombiano',
      symbol: '$',
      decimals: 2,
    },
    minAmount: '0',
    maxAmount: '50000000',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const product2 = {
    id: '9400e866-579a-43fc-a125-6bd6569c5fea',
    code: 'CHK_USD',
    name: 'Corriente USD',
    headline: 'Beneficios para tu día a día',
    term: '360 días',
    audienceType: 'BOTH',
    rateType: 'EA',
    rate: '10',
    type: {
      id: 'fcdbbf24-f46d-443c-b2b3-1e336e590948',
      code: 'CHK',
      name: 'Cuenta Corriente',
      description: 'Producto transaccional',
    },
    currency: {
      id: '104cfd0d-ae14-483b-8d45-6a56484b5398',
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      decimals: 2,
    },
    minAmount: '0',
    maxAmount: '50000000',
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
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
      if (id === '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f')
        return productIndividual1;
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
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].id).toBe('9400e866-579a-43fc-a125-6bd6569c5fea');
    expect(response.body[1].id).toBe('3ca0e159-4ece-4f9f-ba85-1e77c7345a9f');

    expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
  });

  it('GET /products/:id (200) and returns product', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/3ca0e159-4ece-4f9f-ba85-1e77c7345a9f')
      .expect(200);

    expect(response.body.id).toBe('3ca0e159-4ece-4f9f-ba85-1e77c7345a9f');
    expect(response.body.code).toBe('SAV_BASIC');
    expect(response.body.currency.code).toBe('COP');

    expect(prismaMock.product.findUnique).toHaveBeenCalled();
  });

  it('GET /products/:id (404) when not found', async () => {
    const response = await request(app.getHttpServer())
      .get('/products/b9283b9a-2067-4e72-91f1-54a640971658')
      .expect(404);

    expect(response.body).toMatchObject({
      statusCode: 404,
      message: 'Product not found',
      error: 'Not Found',
    });
  });
});

import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  let service: ProductsService;

  const repoMock = {
    findMany: jest.fn(),
    findById: jest.fn(),
  };

  const productListMock = {
    id: '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f',
    code: 'SAV_BASIC',
    name: 'Ahorros Básica',
    headline: 'Beneficios para tu día a día',
    audienceType: 'ALL',
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

  const productMock = {
    id: '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f',
    code: 'SAV_BASIC',
    name: 'Ahorros Básica',
    headline: 'Beneficios para tu día a día',
    term: '360 días',
    audienceType: 'ALL',
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

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: repoMock },
      ],
    }).compile();

    service = moduleRef.get(ProductsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll() should return the result', async () => {
    repoMock.findMany.mockResolvedValueOnce([productListMock]);

    const result = await service.findAll();

    expect(repoMock.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([productListMock]);
  });

  it('findOne() should return product when it is found ', async () => {
    repoMock.findById.mockResolvedValueOnce(productMock);

    const result = await service.findOne(
      'a3d9b778-488a-4fe3-a7c4-da73b84d8e15',
    );

    expect(repoMock.findById).toHaveBeenCalledWith(
      'a3d9b778-488a-4fe3-a7c4-da73b84d8e15',
    );
    expect(result).toEqual(productMock);
  });

  it('findOne() should throw NotFoundException when it is not found', async () => {
    repoMock.findById.mockResolvedValueOnce(null);

    await expect(
      service.findOne('2d57713a-0378-4957-8e60-b56e9f929d04'),
    ).rejects.toBeInstanceOf(NotFoundException);
    await expect(
      service.findOne('2d57713a-0378-4957-8e60-b56e9f929d04'),
    ).rejects.toMatchObject({
      message: 'Product not found',
    });
  });
});

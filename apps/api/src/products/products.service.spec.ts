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

  const productFixture = {
    id: 'a3d9b778-488a-4fe3-a7c4-da73b84d8e15',
    code: 'SAV_BASIC',
    name: 'Ahorros Básica',
    description: null,
    active: true,
    minAmount: '0',
    maxAmount: '50000000',
    currency: {
      id: 'bf68ac53-c172-4ec1-b5cb-020a086275d9',
      code: 'COP',
      name: 'Peso colombiano',
      symbol: '$',
      decimals: 2,
    },
    type: {
      id: 'bc1157a6-5e81-4400-a3d7-760696e6d5d4',
      code: 'SAV',
      name: 'Cuenta de Ahorros',
      description: 'Producto de ahorro',
    },
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
    repoMock.findMany.mockResolvedValueOnce([productFixture]);

    const result = await service.findAll();

    expect(repoMock.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([productFixture]);
  });

  it('findOne() should return product when it is found ', async () => {
    repoMock.findById.mockResolvedValueOnce(productFixture);

    const result = await service.findOne(
      'a3d9b778-488a-4fe3-a7c4-da73b84d8e15',
    );

    expect(repoMock.findById).toHaveBeenCalledWith(
      'a3d9b778-488a-4fe3-a7c4-da73b84d8e15',
    );
    expect(result).toEqual(productFixture);
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

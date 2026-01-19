import { Test } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  const serviceMock = {
    findAll: jest.fn(),
    findOne: jest.fn(),
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
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: serviceMock }],
    }).compile();

    controller = moduleRef.get<ProductsController>(ProductsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getProducts() should call the service method findAll and return a successful result', async () => {
    serviceMock.findAll.mockResolvedValueOnce([productListMock]);

    const result = await controller.getProducts();

    expect(serviceMock.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([productListMock]);
  });

  it('getProductById() should call the service method findOne with the parameter id and return a succesful return', async () => {
    serviceMock.findOne.mockResolvedValueOnce(productMock);

    const result = await controller.getProductById(
      '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f',
    );

    expect(serviceMock.findOne).toHaveBeenCalledTimes(1);
    expect(serviceMock.findOne).toHaveBeenCalledWith(
      '3ca0e159-4ece-4f9f-ba85-1e77c7345a9f',
    );
    expect(result).toEqual(productMock);
  });
});

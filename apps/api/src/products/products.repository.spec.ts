import { PrismaService } from '../prisma/prisma.service';
import { ProductsRepository } from './products.repository';
import { Test } from '@nestjs/testing';
import { PRODUCT_SELECT } from './constants/product.select';

describe('ProductsRepository', () => {
  let repo: ProductsRepository;

  const prismaMock = {
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProductsRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    repo = module.get<ProductsRepository>(ProductsRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('findMany() should call it with select and orderBy', async () => {
    prismaMock.product.findMany.mockResolvedValueOnce([]);

    await repo.findMany();

    expect(prismaMock.product.findMany).toHaveBeenCalledTimes(1);
    expect(prismaMock.product.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
      select: PRODUCT_SELECT,
    });
  });

  it('findById() should call it with id and select', async () => {
    prismaMock.product.findMany.mockResolvedValueOnce(null);

    await repo.findById('80f919c2-e2dc-4ae2-80c5-11f8bb05afce');

    expect(prismaMock.product.findUnique).toHaveBeenCalledTimes(1);
    expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
      where: { id: '80f919c2-e2dc-4ae2-80c5-11f8bb05afce' },
      select: PRODUCT_SELECT,
    });
  });
});

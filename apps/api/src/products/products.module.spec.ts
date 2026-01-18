import { Test } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsModule', () => {
  it('should compile module and resolve providers', async () => {
    const prismaMock = {
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module = await Test.createTestingModule({
      imports: [PrismaModule, ProductsModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    expect(module.get(ProductsController)).toBeInstanceOf(ProductsController);
    expect(module.get(ProductsService)).toBeInstanceOf(ProductsService);
    expect(module.get(ProductsRepository)).toBeInstanceOf(ProductsRepository);
  });
});

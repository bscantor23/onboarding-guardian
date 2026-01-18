import { Test } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsModule', () => {
  it('should compile module and resolve providers', async () => {
    const module = await Test.createTestingModule({
      imports: [PrismaModule, ProductsModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        product: {
          findMany: jest.fn(),
          findUnique: jest.fn(),
        },
      })
      .compile();

    const controller = module.get(ProductsController);
    const service = module.get(ProductsService);
    const repo = module.get(ProductsRepository);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});

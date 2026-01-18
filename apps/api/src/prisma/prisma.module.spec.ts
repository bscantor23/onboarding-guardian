import { Test } from '@nestjs/testing';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

describe('PrismaModule', () => {
  it('should compile module and resolve providers', async () => {
    const prismaMock = {
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      product: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const module = await Test.createTestingModule({
      imports: [PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    const prismaService = module.get<PrismaService>(PrismaService);
    expect(prismaService).toBe(prismaMock);
  });
});

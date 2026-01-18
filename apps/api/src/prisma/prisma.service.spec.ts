import { PrismaService } from './prisma.service';

jest.mock('pg', () => ({
  Pool: jest.fn().mockImplementation(() => ({
    end: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('@prisma/adapter-pg', () => ({
  PrismaPg: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@prisma/client', () => {
  class PrismaClientMock {
    $connect = jest.fn().mockResolvedValue(undefined);
    $disconnect = jest.fn().mockResolvedValue(undefined);
  }

  return { PrismaClient: PrismaClientMock };
});

describe('PrismaService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    jest.clearAllMocks();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should throw if DATABASE_URL is missing', () => {
    delete process.env.DATABASE_URL;
    expect(() => new PrismaService()).toThrow();
  });

  it('should init and destroy correctly when DATABASE_URL exists', async () => {
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';

    const service = new PrismaService();

    await service.onModuleInit();
    await service.onModuleDestroy();

    expect((service as any).$connect).toHaveBeenCalledTimes(1);
    expect((service as any).$disconnect).toHaveBeenCalledTimes(1);
    expect((service as any).pool.end).toHaveBeenCalledTimes(1);
  });
});

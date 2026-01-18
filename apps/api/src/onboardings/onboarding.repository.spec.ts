import { Test } from '@nestjs/testing';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingRepository } from './onboarding.repository';
import { ONBOARDING_SELECT } from './selects/onboarding.select';
import { PrismaService } from 'src/prisma/prisma.service';

describe('OnboardingRepository', () => {
  let repo: OnboardingRepository;

  const prismaMock = {
    onboarding: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OnboardingRepository,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    repo = module.get(OnboardingRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('create() should call prisma method with select', async () => {
    prismaMock.onboarding.create.mockResolvedValue({
      id: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });

    const dto: CreateOnboardingDto = {
      fullName: 'Camilo Rodriguez',
      document: '12345',
      email: 'camilo@test.com',
      initialAmount: '1000.00',
    };

    const response = await repo.create(dto);

    expect(prismaMock.onboarding.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.onboarding.create).toHaveBeenCalledWith({
      data: { ...dto, status: 'REQUESTED' },
      select: ONBOARDING_SELECT,
    });
    expect(response).toEqual({
      id: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });
  });
});

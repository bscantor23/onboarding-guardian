import { Test } from '@nestjs/testing';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingRepository } from './onboarding.repository';
import { OnboardingSelectResult } from './selects/onboarding.select';

describe('OnboardingService', () => {
  let service: OnboardingService;

  const repoMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OnboardingService,
        { provide: OnboardingRepository, useValue: repoMock },
      ],
    }).compile();

    service = module.get(OnboardingService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should call repository method an return a successful result', async () => {
    const dto: CreateOnboardingDto = {
      fullName: 'Camilo Rodriguez',
      document: '12345',
      email: 'camilo@test.com',
      initialAmount: '1000.00',
    };

    const repoResult: OnboardingSelectResult = {
      id: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    };

    repoMock.create.mockResolvedValue(repoResult);

    const response = await service.create(dto);

    expect(repoMock.create).toHaveBeenCalledTimes(1);
    expect(repoMock.create).toHaveBeenCalledWith(dto);
    expect(response).toEqual({
      onboardingId: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });
  });
});

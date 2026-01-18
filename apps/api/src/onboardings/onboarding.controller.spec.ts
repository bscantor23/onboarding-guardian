import { Test } from '@nestjs/testing';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

describe('OnboardingController', () => {
  let controller: OnboardingController;

  const serviceMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [OnboardingController],
      providers: [{ provide: OnboardingService, useValue: serviceMock }],
    }).compile();

    controller = module.get(OnboardingController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create() should call service method an return a successful result', async () => {
    const dto: CreateOnboardingDto = {
      fullName: 'Camilo Rodriguez',
      document: '12345',
      email: 'camilo@test.com',
      initialAmount: '1000.00',
    };

    serviceMock.create.mockResolvedValue({
      onboardingId: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });

    const response = await controller.create(dto);

    expect(serviceMock.create).toHaveBeenCalledTimes(1);
    expect(serviceMock.create).toHaveBeenCalledWith(dto);
    expect(response).toEqual({
      onboardingId: '2b0d7214-ff41-41fb-99aa-d16370c51946',
      status: 'REQUESTED',
    });
  });
});

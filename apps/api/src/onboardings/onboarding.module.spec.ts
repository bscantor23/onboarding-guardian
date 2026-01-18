import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OnboardingController } from './onboarding.controller';
import { OnboardingRepository } from './onboarding.repository';
import { OnboardingService } from './onboarding.service';
import { OnboardingModule } from './onboarding.module';

describe('OnboardingModule', () => {
  it('should compile module and resolve providers', async () => {
    const module = await Test.createTestingModule({
      imports: [OnboardingModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        onboarding: { create: jest.fn() },
      })
      .compile();

    const controller = module.get(OnboardingController);
    const service = module.get(OnboardingService);
    const repo = module.get(OnboardingRepository);

    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});

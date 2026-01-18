import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from './health.module';
import { HealthController } from './health.controller';

describe('HealthModule', () => {
  it('should compile and resolve HealthController', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    const controller = module.get<HealthController>(HealthController);
    expect(controller).toBeDefined();
  });
});

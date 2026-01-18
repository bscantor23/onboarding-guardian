import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthResponseDto } from './dto/health-response.dto';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('health() should return HealthResponseDto with ok', () => {
    const result = controller.health();
    expect(result).toBeInstanceOf(HealthResponseDto);
    expect(result).toEqual({ ok: true });
  });
});

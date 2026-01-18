import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  it('should be defined', () => {
    const config: ConfigService = {
      get: jest.fn().mockReturnValue('test-secret'),
    } as unknown as ConfigService;

    const strategy = new JwtStrategy(config);
    expect(strategy).toBeDefined();
  });

  it('validate() should map payload', async () => {
    const config = {
      get: jest.fn().mockReturnValue('test-secret'),
    } as unknown as ConfigService;

    const strategy = new JwtStrategy(config);

    const payload = {
      sub: 'guardian',
      username: 'guardian',
      iat: '111111',
      exp: '222222',
    };

    const result = await strategy.validate(payload as any);

    expect(result).toEqual({
      userId: 'guardian',
      username: 'guardian',
    });
  });
});

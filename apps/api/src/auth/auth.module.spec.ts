import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AuthModule', () => {
  it('should compile module and resolve providers', async () => {
    const configServiceMock = {
      get: jest.fn((key: string, defaultValue?: any) => {
        if (key === 'JWT_SECRET') return 'sbx-secret';
        if (key === 'JWT_EXPIRES_IN') return '5m';
        return defaultValue;
      }),
    };

    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
    })
      .overrideProvider(ConfigService)
      .useValue(configServiceMock)
      .compile();

    expect(module.get(AuthController)).toBeInstanceOf(AuthController);
    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
    expect(module.get(JwtStrategy)).toBeInstanceOf(JwtStrategy);

    expect(configServiceMock.get).toHaveBeenCalledWith('JWT_EXPIRES_IN', '5m');
    expect(configServiceMock.get).toHaveBeenCalledWith(
      'JWT_SECRET',
      'sbx-secret',
    );
  });
});

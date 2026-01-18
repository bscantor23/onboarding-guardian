import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: Promise<TestingModule> = Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('fake.token'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string, defaultValue?: any) => {
              if (key === 'DEMO_USER') return 'guardian';
              if (key === 'DEMO_PASS') return 'onboarding_pass';
              return defaultValue;
            },
          },
        },
      ],
    }).compile();

    authService = (await module).get(AuthService);
  });

  it('should return access_token when the credentials are valid', async () => {
    const response = await authService.login('guardian', 'onboarding_pass');
    expect(response).toHaveProperty('accessToken');
    expect(typeof response.accessToken).toBe('string');
  });

  it('should throw UnauthorizedException when credentials are invalid', async () => {
    await expect(authService.login('ward', 'board')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});

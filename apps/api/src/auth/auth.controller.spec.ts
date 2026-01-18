import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login() should call Authservice.login and return a successful result', async () => {
    const dto = { username: 'guardian', password: 'onboading_pass' };
    const expected = { accessToken: 'jwt.token' };

    mockAuthService.login.mockResolvedValue(expected);

    const result = await controller.login(dto as any);
    expect(service.login).toHaveBeenCalledWith(dto.username, dto.password);
    expect(result).toEqual(expected);
  });
});

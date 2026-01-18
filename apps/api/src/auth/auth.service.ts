import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const expectedUsername = this.config.get<string>('DEMO_USER');
    const expectedPassword = this.config.get<string>('DEMO_PASS');

    if (username !== expectedUsername || password !== expectedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: username, username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}

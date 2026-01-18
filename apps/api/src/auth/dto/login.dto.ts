import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'guardian' })
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty({ example: 'onboarding_pass' })
  @IsString()
  @MinLength(1)
  password: string;
}

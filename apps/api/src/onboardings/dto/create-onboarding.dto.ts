import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOnboardingDto {
  @ApiProperty({ example: 'STEBAN CANTOR' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  fullName: string;

  @ApiProperty({ example: '1234567890' })
  @Transform(({ value }) => value?.trim().toUpperCase())
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  document: string;

  @ApiProperty({ example: 'bscantor@test.com' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1000.00',
    description: 'Monto inicial como string numérico',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsNumberString({}, { message: 'initialAmount must be a numeric string' })
  initialAmount: string;
}

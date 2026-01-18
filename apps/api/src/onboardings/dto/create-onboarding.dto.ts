import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOnboardingDto {
  @Transform(({ value }) => value?.trim().toUpperCase())
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  fullName: string;

  @Transform(({ value }) => value?.trim().toUpperCase())
  @IsString()
  @IsNotEmpty()
  @Length(5, 30)
  document: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @IsNumberString({}, { message: 'initialAmount must be a numeric string' })
  initialAmount: string;
}

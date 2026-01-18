import { ApiProperty } from '@nestjs/swagger';

export enum OnboardingStatus {
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class OnboardingResponseDto {
  @ApiProperty({
    example: '2b0d7214-ff41-41fb-99aa-d16370c51946',
  })
  onboardingId: string;

  @ApiProperty({
    enum: OnboardingStatus,
    example: OnboardingStatus.REQUESTED,
  })
  status: OnboardingStatus;
}

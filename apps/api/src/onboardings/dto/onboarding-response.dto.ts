export class OnboardingResponseDto {
  onboardingId: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED';
}

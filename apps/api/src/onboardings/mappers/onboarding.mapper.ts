import { OnboardingResponseDto } from '../dto/onboarding-response.dto';
import { OnboardingSelectResult } from '../selects/onboarding.select';

export class OnboardingMapper {
  static toResponse(o: OnboardingSelectResult): OnboardingResponseDto {
    return {
      onboardingId: o.id,
      status: o.status,
    };
  }
}

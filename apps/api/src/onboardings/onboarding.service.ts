import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingMapper } from './mappers/onboarding.mapper';
import { OnboardingRepository } from './onboarding.repository';

@Injectable()
export class OnboardingService {
  constructor(private readonly repo: OnboardingRepository) {}

  async create(dto: CreateOnboardingDto) {
    const created = await this.repo.create(dto);
    return OnboardingMapper.toResponse(created);
  }
}

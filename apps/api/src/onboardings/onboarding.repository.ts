import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { ONBOARDING_SELECT } from './selects/onboarding.select';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OnboardingRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateOnboardingDto) {
    return this.prisma.onboarding.create({
      data: {
        ...data,
        status: 'REQUESTED',
      },
      select: ONBOARDING_SELECT,
    });
  }
}

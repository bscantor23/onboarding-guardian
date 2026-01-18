import { Prisma } from '@prisma/client';

export const ONBOARDING_SELECT = Prisma.validator<Prisma.OnboardingSelect>()({
  id: true,
  status: true,
});

export type OnboardingSelectResult = Prisma.OnboardingGetPayload<{
  select: typeof ONBOARDING_SELECT;
}>;

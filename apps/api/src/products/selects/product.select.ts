import { Prisma } from '@prisma/client';

export const PRODUCT_SELECT = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  code: true,
  name: true,
  headline: true,
  generalInfo: true,
  requirements: true,
  term: true,
  audienceType: true,
  rateType: true,
  rate: true,
  active: true,
  minAmount: true,
  maxAmount: true,
  createdAt: true,
  updatedAt: true,
  currency: {
    select: {
      id: true,
      code: true,
      name: true,
      symbol: true,
      decimals: true,
    },
  },
  type: {
    select: {
      id: true,
      code: true,
      name: true,
      description: true,
    },
  },
});

export type ProductSelectResult = Prisma.ProductGetPayload<{
  select: typeof PRODUCT_SELECT;
}>;

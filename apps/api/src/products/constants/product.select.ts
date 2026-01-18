export const PRODUCT_SELECT = {
  id: true,
  code: true,
  name: true,
  description: true,
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
} as const;

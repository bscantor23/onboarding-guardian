export class ProductResponseDto {
  id: string;
  code: string;
  name: string;
  description?: string | null;

  active: boolean;

  minAmount: string;
  maxAmount: string;

  currency: {
    id: string;
    code: string;
    name: string;
    symbol: string;
    decimals: number;
  };

  type: {
    id: string;
    code: string;
    name: string;
    description?: string | null;
  };

  createdAt: Date;
  updatedAt: Date;
}

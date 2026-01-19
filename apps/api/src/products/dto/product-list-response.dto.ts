export class ProductListResponseDto {
  id: string;
  code: string;
  name: string;
  headline: string;
  audienceType: string;

  type: {
    id: string;
    code: string;
    name: string;
    description?: string | null;
  };

  currency: {
    id: string;
    code: string;
    name: string;
    symbol: string;
    decimals: number;
  };

  minAmount: string;
  maxAmount: string;
  createdAt: Date;
  updatedAt: Date;
}

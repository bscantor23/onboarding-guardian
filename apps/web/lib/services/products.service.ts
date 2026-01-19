import { apiClient, toApiClientError } from "../http/axios-client";

export type Product = {
  id: string;
  code: string;
  name: string;
  headline: string;
  generalInfo?: string | null;
  requirements?: string | null;
  term?: string | null;

  audienceType: string;
  rateType?: string | null;
  rate?: string | null;

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
  active: boolean;

  createdAt: Date;
  updatedAt: Date;
};

export type ListProductsResponse = {
  items: Product[];
};

function mappingListResponse(data: unknown): Product[] {
  if (Array.isArray(data)) return data as Product[];
  return [];
}

export class ProductsService {
  async list(): Promise<Product[]> {
    try {
      const { data } = await apiClient.get("/products");
      console.log(data);
      return mappingListResponse(data);
    } catch (e: unknown) {
      throw toApiClientError(e);
    }
  }
}

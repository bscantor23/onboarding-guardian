import { ProductListResponseDto } from '../dto/product-list-response.dto';
import { ProductResponseDto } from '../dto/product-response.dto';
import { ProductSelectResult } from '../selects/product.select';

export class ProductMapper {
  static toIndividualResponse(p: ProductSelectResult): ProductResponseDto {
    return {
      id: p.id,
      code: p.code,
      name: p.name,
      headline: p.headline,
      generalInfo: p.generalInfo,
      requirements: p.requirements,
      term: p.term,
      audienceType: p.audienceType,
      rateType: p.rateType,
      rate: p.rate?.toString(),

      type: {
        id: p.type.id,
        code: p.type.code,
        name: p.type.name,
        description: p.type.description,
      },

      currency: {
        id: p.currency.id,
        code: p.currency.code,
        name: p.currency.name,
        symbol: p.currency.symbol,
        decimals: p.currency.decimals,
      },

      minAmount: p.minAmount.toString(),
      maxAmount: p.maxAmount.toString(),
      active: p.active,

      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }

  static toResponse(p: ProductSelectResult): ProductListResponseDto {
    return {
      id: p.id,
      code: p.code,
      name: p.name,
      headline: p.headline,
      audienceType: p.audienceType,

      type: {
        id: p.type.id,
        code: p.type.code,
        name: p.type.name,
        description: p.type.description,
      },

      currency: {
        id: p.currency.id,
        code: p.currency.code,
        name: p.currency.name,
        symbol: p.currency.symbol,
        decimals: p.currency.decimals,
      },

      minAmount: p.minAmount.toString(),
      maxAmount: p.maxAmount.toString(),
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }

  static toResponseList(list: any[]): ProductListResponseDto[] {
    return list.map(ProductMapper.toResponse);
  }
}

import { ProductResponseDto } from '../dto/product-response.dto';

export class ProductMapper {
  static toResponse(p: any): ProductResponseDto {
    return {
      id: p.id,
      code: p.code,
      name: p.name,
      description: p.description,

      active: p.active,

      minAmount: p.minAmount.toString(),
      maxAmount: p.maxAmount.toString(),

      currency: {
        id: p.currency.id,
        code: p.currency.code,
        name: p.currency.name,
        symbol: p.currency.symbol,
        decimals: p.currency.decimals,
      },

      type: {
        id: p.type.id,
        code: p.type.code,
        name: p.type.name,
        description: p.type.description,
      },

      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }

  static toResponseList(list: any[]): ProductResponseDto[] {
    return list.map(ProductMapper.toResponse);
  }
}

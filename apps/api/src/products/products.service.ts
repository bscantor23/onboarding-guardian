import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.repo.findMany();
    return ProductMapper.toResponseList(products);
  }

  async findOne(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return ProductMapper.toResponse(product);
  }
}

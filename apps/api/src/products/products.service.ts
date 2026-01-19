import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(private readonly repo: ProductsRepository) {}

  async findAll() {
    const products = await this.repo.findMany();
    return ProductMapper.toResponseList(products);
  }

  async findOne(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return ProductMapper.toIndividualResponse(product);
  }
}

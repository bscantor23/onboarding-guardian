import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';
import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<ProductResponseDto[]> {
    return this.productsService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    example: 'ebb61622-3bd9-4886-aa4b-bc99264fea24',
  })
  @ApiOkResponse({ type: ProductResponseDto })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':id')
  getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productsService.findOne(id);
  }
}

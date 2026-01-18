import { Injectable } from '@nestjs/common';
import { PRODUCT_SELECT } from './constants/product.select';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: PRODUCT_SELECT,
    });
  }

  findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      select: PRODUCT_SELECT,
    });
  }
}

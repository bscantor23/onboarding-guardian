import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PRODUCT_SELECT } from './selects/product.select';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      where: { active: true },
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

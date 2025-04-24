// src/modules/products/v1-2/class/products-class.service.ts

import type { Product } from '@prisma/client'
import prisma from '@libs/prisma'
import type { CreateProductDto } from '../products.types'

export class ProductsService {
  private prisma = prisma

  public async getAll(): Promise<Product[]> {
    return this.prisma.product.findMany()
  }

  public async create(title: CreateProductDto['title']): Promise<Product> {
    return this.prisma.product.create({
      data: { title },
    })
  }
}

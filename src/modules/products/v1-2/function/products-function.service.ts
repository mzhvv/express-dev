// src/modules/products/v1-2/function/products-function.service.ts

import type { Product } from '@prisma/client'
import prisma from '@libs/prisma'

import type {
  CreateProductDto,
  UpdateProductDTO,
  ProductsPaginationQueryStrict,
  ProductsQuery,
} from '../products.types'

const productsService = {
  create: async (data: CreateProductDto): Promise<Product> => {
    const createdProduct = await prisma.product.create({
      data: { title: data.title },
    })

    return createdProduct
  },

  getAll: async (query: ProductsQuery) => {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: query.orderBy },
    })

    return products
  },

  getPaginated: async (query: ProductsPaginationQueryStrict) => {
    const products = await prisma.product.findMany({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: { createdAt: query.orderBy },
    })

    return products
  },

  getById: async (id: Product['id']): Promise<Product> => {
    const product = await prisma.product.findUniqueOrThrow({
      where: { id },
    })

    return product
  },

  update: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        updatedAt: new Date(),
      },
    })

    return updatedProduct
  },

  partialUpdate: async (id: Product['id'], data: Partial<UpdateProductDTO>): Promise<Product> => {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return updatedProduct
  },

  delete: async (id: Product['id']): Promise<void> => {
    await prisma.product.delete({
      where: { id },
    })
  },
}

export { productsService }

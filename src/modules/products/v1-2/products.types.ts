// src/modules/products/v1-2/products.types.ts

import { z } from 'zod'
import { Product } from '@prisma/client'

import type {
  CreateProductsDTOSchema,
  UpdateProductsDTOSchema,
  ProductsQuerySchema,
  ProductsPaginationQuerySchema,
} from './products.schemas'

export type CreateProductDto = z.infer<typeof CreateProductsDTOSchema>
export type UpdateProductDTO = z.infer<typeof UpdateProductsDTOSchema>

// getAll

export type ProductsQuery = z.infer<typeof ProductsQuerySchema>
export type ProductsPaginationQuery = z.infer<typeof ProductsPaginationQuerySchema>
export interface ProductsPaginationQueryStrict
  extends Omit<ProductsPaginationQuery, 'page' | 'limit'> {
  page: NonNullable<ProductsPaginationQuery['page']>
  limit: NonNullable<ProductsPaginationQuery['limit']>
}

export type ProductsMeta = ProductsQuery
export type ProductsPaginationMeta = ProductsPaginationQuery

export type ResponseGetAll =
  | {
      data: Product[]
      meta: ProductsMeta
    }
  | {
      data: Product[]
      meta: ProductsPaginationMeta
    }

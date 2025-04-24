// src/modules/products/v1-2/products.schemas.ts

import { z } from 'zod'

export const CreateProductsDTOSchema = z.object({
  title: z.string(),
})

export const UpdateProductsDTOSchema = z
  .object({
    title: z.string().min(1).max(255).optional(),
  })
  .strict()

export const ProductsQuerySchema = z.object({
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export const ProductsPaginationQuerySchema = ProductsQuerySchema.extend({
  page: z
    .string()
    .transform(Number)
    .refine(n => n > 0, 'page - должен быть положительным числом')
    .optional(),
  limit: z
    .string()
    .transform(Number)
    .refine(n => n > 0, 'limit - должен быть положительным числом')
    .optional(),
}).refine(data => !((data.page && !data.limit) || (!data.page && data.limit)), {
  message: 'Для пагинации укажите оба параметра: page и limit (...?page=1&limit=5)',
})

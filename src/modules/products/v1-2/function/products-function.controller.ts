// src/modules/products/v1-2/function/products-function.controller.ts

import type { Request, Response } from 'express'
import type { Product } from '@prisma/client'

import { errorHandling } from '@utils/error-handling/function' // src/utils/error-handling/index.ts - информация
import { zodValidator } from '@utils/validations/zod/function' // src/utils/validations/zod/index.ts - информация

import type { CreateProductDto, UpdateProductDTO, ResponseGetAll } from '../products.types'
import {
  CreateProductsDTOSchema,
  UpdateProductsDTOSchema,
  ProductsPaginationQuerySchema,
} from '../products.schemas'
import { productsService } from './products-function.service'

// Декоратор

type _ = void

interface ProductsRequest<REQ = never, PARAMS = never> extends Omit<Request, 'body' | 'params'> {
  body: [REQ] extends [never] ? Request['body'] : { data: REQ }
  params: [PARAMS] extends [never] ? Request['params'] : PARAMS & Request['params']
}
type ProductsResponse<RES> = Promise<Response<RES, Record<string, string>>>

function withErrorHandling<REQ = never, PARAMS = never, RES = never>(
  fn: (req: ProductsRequest<REQ, PARAMS>, res: Response<RES>) => ProductsResponse<RES>
) {
  return async (req: ProductsRequest<REQ, PARAMS>, res: Response<RES>): Promise<void> => {
    try {
      await fn(req, res)
    } catch (error) {
      errorHandling(error, res)
    }
  }
}

// Контроллер

const productsController = {
  create: withErrorHandling<CreateProductDto, _, Product>(async (req, res) => {
    const validatedData = zodValidator.data(req.body.data, CreateProductsDTOSchema)

    const createdProduct = await productsService.create(validatedData)

    return res.status(201).json(createdProduct)
  }),

  getAll: withErrorHandling<_, _, ResponseGetAll>(async (req, res) => {
    const { page, limit, orderBy } = ProductsPaginationQuerySchema.parse(req.query)

    const isPaginationMode = !!(page && limit)

    const data = isPaginationMode
      ? await productsService.getPaginated({ page: page, limit: limit, orderBy })
      : await productsService.getAll({ orderBy })

    const meta = isPaginationMode ? { page: page, limit: limit, orderBy } : { orderBy }

    return res.status(200).json({
      data,
      meta,
    })
  }),

  getById: withErrorHandling<_, _, Product>(async (req, res) => {
    const validatedId = zodValidator.uuid(req.params.id)

    const product = await productsService.getById(validatedId)

    return res.status(200).json(product)
  }),

  update: withErrorHandling<UpdateProductDTO, _, Product>(async (req, res) => {
    const validatedId = zodValidator.uuid(req.params.id)
    const validatedData = zodValidator.data(req.body.data, UpdateProductsDTOSchema)

    const updatedProduct = await productsService.update(validatedId, validatedData)

    return res.status(200).json(updatedProduct)
  }),

  partialUpdate: withErrorHandling<UpdateProductDTO, _, Product>(async (req, res) => {
    const validatedId = zodValidator.uuid(req.params.id)
    const validatedData = zodValidator.data(req.body.data, UpdateProductsDTOSchema)

    const updatedProduct = await productsService.partialUpdate(validatedId, validatedData)

    return res.status(200).json(updatedProduct)
  }),

  delete: withErrorHandling<_, _, _>(async (req, res) => {
    const validatedId = zodValidator.uuid(req.params.id)

    await productsService.delete(validatedId)

    return res.status(204).send()
  }),
}

export { productsController }

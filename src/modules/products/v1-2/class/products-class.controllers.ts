// src/modules/products/v1-2/class/products-class.controllers.ts

import type { Request, Response } from 'express'
import type { ZodError } from 'zod'

import type { ProductsService } from './products-class.service'
import { CreateProductsDTOSchema } from '../products.schemas'

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productsService.getAll()
      res.json(products)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = CreateProductsDTOSchema.safeParse(req.body)
      if (!validationResult.success) {
        return this.handleValidationError(res, validationResult.error)
      }

      const product = await this.productsService.create(validationResult.data.title)
      res.status(201).json(product)
    } catch (error) {
      this.handleError(res, error)
    }
  }

  private handleValidationError(res: Response, error: ZodError) {
    res.status(400).json({
      error: 'Validation error',
      details: error.flatten(),
    })
  }

  private handleError(res: Response, error: unknown) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

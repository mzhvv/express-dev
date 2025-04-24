// src/modules/products/v1-2/class/products-class.router.ts

import { Router } from 'express'
import { ProductsController } from './products-class.controllers'
import { ProductsService } from './products-class.service'

export class ProductsRouter {
  public readonly router: Router
  private readonly controller: ProductsController

  constructor() {
    this.router = Router()
    this.controller = new ProductsController(new ProductsService())
    this.setupRoutes()
  }

  private setupRoutes() {
    this.router.get('/products', this.controller.getAll.bind(this.controller))
    this.router.post('/products', this.controller.create.bind(this.controller))
  }
}

export const productsRouter = () => new ProductsRouter().router

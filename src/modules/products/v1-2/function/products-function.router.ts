// src/modules/products/v1-2/function/products-function.router.ts

import { Router } from 'express'
import { productsController } from './products-function.controller'

const router = Router()

router.post('/products', productsController.create)
router.get('/products', productsController.getAll)
router.get('/products/:id', productsController.getById)
router.patch('/products/:id', productsController.partialUpdate)
router.put('/products/:id', productsController.update)
router.delete('/products/:id', productsController.delete)

export const productsRouter = router

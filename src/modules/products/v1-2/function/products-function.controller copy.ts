// // src/modules/products/v1-2/function/products-function.controller.ts

// import type { Request, Response } from 'express'
// import type { Product } from '@prisma/client'

// import { errorHandling } from '@utils/error-handling/function' // src/utils/error-handling/index.ts - информация
// import { zodValidator } from '@utils/validations/zod/function' // src/utils/validations/zod/index.ts - информация

// import { CreateProductsDTOSchema, UpdateProductsDTOSchema } from '../products.schemas'
// import type { CreateProductDto, UpdateProductDTO } from '../products.types'
// import { productsService } from './products-function.service'

// type _ = void

// type productId = { id: Product['id'] }

// type ProductsResponse<RES> = Promise<Response<RES, Record<string, string>>>
// interface ProductsRequest<REQ = never, PARAMS = never> extends Omit<Request, 'body' | 'params'> {
//   /**
//    * - Если REQ не указан -> Стандартнымй тип Express Request['body']
//    * - Если REQ указан -> { data: REQ }
//    */
//   body: [REQ] extends [never] ? Request['body'] : { data: REQ }
//   /**
//    * - Если PARAMS не указан -> Стандартнымй тип Express Request['params']
//    * - Если PARAMS указан -> PARAMS объединяется со стандартными типами Express Request['params'] -> (PARAMS & Request['params'])
//    *
//    * ! PARAMS & Request['params'] полностью БЕЗОПАСЕН: сохраняет совместимость с Express и middleware, защищая от ошибок типов
//    */
//   params: [PARAMS] extends [never] ? Request['params'] : PARAMS & Request['params']
// }
// /**
//  * @template REQ - Тип тела HTTP-запроса (по умолчанию never)
//  * @template PARAMS - Тип URL-параметров (по умолчанию never)
//  * @template RES - Тип тела HTTP-ответа (по умолчанию never)
//  *
//  * @example
//  * // REQ и RES
//  * // _ (дженерик) - специальный тип-маркер (type _ = void) для явного указания неиспользуемых generic-параметров. Альтернатива never в данном контексте
//  * // _ (в параметре функции) - соглашение об игнорировании параметра
//  * getAll: withErrorHandling<_, _, Product[]>(async (_, res) => {...}
//  *
//  * @example
//  * // Без PARAMS - когда нет URL-параметр -> .../... -> ...('/products', productsControllers.create)
//  * create: withErrorHandling<CreateProductDto, _, Product>(...) {...}
//  *
//  * @example
//  * // C PARAMS - когда есть URL-параметр -> .../:... -> ...('/products/:id', productsControllers.update)
//  * update: withErrorHandling<UpdateProductDTO, Product['id'], Product>(...) {...}
//  * // или когда есть URL-параметры -> .../:id/:...
//  * withErrorHandling<UpdateProductDTO, { id: Product['id']; ... }), Product>(...) {...}
//  *
//  * //
//  *
//  * @example
//  * // REQ и RES
//  * // _ (дженерик) - специальный тип-маркер (type _ = void) для явного указания неиспользуемых generic-параметров. Альтернатива never в данном контексте
//  * // _ (в параметре функции) - соглашение об игнорировании параметра
//  * getAll: withErrorHandling<_, _, Product[]>(async (_, res) => {...}
//  *
//  * @example
//  * // Без PARAMS - когда нет URL-параметр -> .../... -> ...('/products', productsControllers.create)
//  * create: withErrorHandling<CreateProductDto, _, Product>(...) {...}
//  *
//  * @example
//  * // C PARAMS - когда есть URL-параметр -> .../:... -> ...('/products/:id', productsControllers.update)
//  * update: withErrorHandling<UpdateProductDTO, Product['id'], Product>(...) {...}
//  * // или когда есть URL-параметры -> .../:id/:...
//  * withErrorHandling<UpdateProductDTO, { id: Product['id']; ... }), Product>(...) {...}
//  */
// function withErrorHandling<REQ = never, PARAMS = never, RES = never>(
//   fn: (req: ProductsRequest<REQ, PARAMS>, res: Response<RES>) => ProductsResponse<RES>
// ) {
//   return async (req: ProductsRequest<REQ, PARAMS>, res: Response<RES>): Promise<void> => {
//     try {
//       await fn(req, res)
//     } catch (error) {
//       errorHandling(error, res)
//     }
//   }
// }

// interface ProductsRequest_OVERSTRICT<
//   REQ = never,
//   CUSTOM_PARAMS extends boolean = false,
//   PARAMS = never,
// > extends Omit<Request, 'body' | 'params'> {
//   body: [REQ] extends [never] ? Request['body'] : { data: REQ }
//   /**
//    * - Если CUSTOM_PARAMS = false → стандартными параметрами Expres Request['params']
//    * - Если CUSTOM_PARAMS = true и PARAMS не указан → стандартными параметрами Expres Request['params']
//    * - Если CUSTOM_PARAMS = true и PARAMS указан → PARAMS
//    *
//    * ! PARAMS без Request['params'] НЕ БЕЗОПАСЕН!: работает только с указанными типами, игнорируя стандартные Express параметры и потенциально ломая middleware
//    */
//   params: CUSTOM_PARAMS extends true ? PARAMS : Request['params']
// }
// /**
//  * @template REQ - Тип тела HTTP-запроса (по умолчанию never)
//  * @template CUSTOM_PARAMS - Флаг кастомных параметров (по умолчанию false)
//  * @template PARAMS - Тип URL-параметров (по умолчанию never) (если CUSTOM_PARAMS=true) (по умолчанию never)
//  * @template RES - Тип тела HTTP-ответа (по умолчанию never)
//  *
//  *
//  * @example
//  * update: withErrorHandling_OVERSTRICT<UpdateProductDTO, true, Product['id'] или { id: Product['id']; ... }, Product>(...) {...}
//  */
// function withErrorHandling_OVERSTRICT<
//   REQ = never,
//   CUSTOM_PARAMS extends boolean = false,
//   PARAMS = never,
//   RES = never,
// >(
//   fn: (
//     req: ProductsRequest_OVERSTRICT<REQ, CUSTOM_PARAMS, PARAMS>,
//     res: Response<RES>
//   ) => ProductsResponse<RES>
// ) {
//   return async (
//     req: ProductsRequest_OVERSTRICT<REQ, CUSTOM_PARAMS, PARAMS>,
//     res: Response<RES>
//   ): Promise<void> => {
//     try {
//       await fn(req, res)
//     } catch (error) {
//       errorHandling(error, res)
//     }
//   }
// }

// const productsController = {
//   create: withErrorHandling<CreateProductDto, _, Product>(async (req, res) => {
//     const validatedData = zodValidator.data(req.body.data, CreateProductsDTOSchema)

//     const createdProduct = await productsService.create(validatedData)

//     return res.status(201).json(createdProduct)
//   }),

//   getAll: withErrorHandling<_, _, Product[]>(async (_, res) => {
//     const products = await productsService.getAll()
//     return res.status(200).json(products)
//   }),

//   getById: withErrorHandling<_, productId, Product>(async (req, res) => {
//     const validatedId = zodValidator.uuid(req.params.id)

//     const product = await productsService.getById(validatedId)

//     return res.status(200).json(product)
//   }),

//   update: withErrorHandling<UpdateProductDTO, productId, Product>(async (req, res) => {
//     const validatedId = zodValidator.uuid(req.params.id)
//     const validatedData = zodValidator.data(req.body.data, UpdateProductsDTOSchema)

//     const updatedProduct = await productsService.update(validatedId, validatedData)

//     return res.status(200).json(updatedProduct)
//   }),

//   partialUpdate: withErrorHandling<UpdateProductDTO, productId, Product>(async (req, res) => {
//     const validatedId = zodValidator.uuid(req.params.id)
//     const validatedData = zodValidator.data(req.body.data, UpdateProductsDTOSchema)

//     const updatedProduct = await productsService.partialUpdate(validatedId, validatedData)

//     return res.status(200).json(updatedProduct)
//   }),

//   delete: withErrorHandling<_, productId, _>(async (req, res) => {
//     const validatedId = zodValidator.uuid(req.params.id)

//     await productsService.delete(validatedId)

//     return res.status(204).send()
//   }),
// }

// export { productsController }

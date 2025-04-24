// src/app.ts

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { productsRouterClass, productsRouterFunction } from '@modules/products/v1-2'

const app = express()

// Middleware

app.use(express.json())
app.use(helmet())
app.use(cors())

// Маршруты

// Версия 1 - "Функциональный стиль"
app.use('/v1/api', productsRouterFunction)

// Версия 2 - "Классовый стиль"
app.use('/v2/api', productsRouterClass())

export default app

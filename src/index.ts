// src/index.ts

import dotenv from 'dotenv'

import app from './app'
import { MODE, PORT } from './constants'

// Загружаем переменные окружения

dotenv.config()

// Конфигурация сервера

// ...

// Запуск сервера

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT} (${MODE})`)
})

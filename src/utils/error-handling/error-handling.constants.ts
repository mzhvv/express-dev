// src/utils/error-handling/error-handling.constants.ts

import type { Request } from 'express'
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
export const errorStatusMap: Record<
  PrismaClientKnownRequestError['code'],
  NonNullable<Request['statusCode']>
> = {
  // Not found
  P2025: 404, // Record not found
  P2016: 404, // Related record not found (для отношений)

  // Conflict
  P2002: 409, // Unique constraint violation
  P2003: 409, // Foreign key constraint

  // Bad Request
  P2000: 400, // Value too long
  P2001: 400, // Filter condition invalid
  P2004: 400, // Constraint failed
  P2005: 400, // Invalid field value
  P2006: 400, // Invalid value
  P2007: 400, // Data validation error
  P2008: 400, // Query parsing failed
  P2009: 400, // Query validation failed
  P2010: 400, // Raw query failed
  P2011: 400, // Null constraint violation
  P2012: 400, // Missing required value
  P2013: 400, // Missing required argument
  P2014: 400, // Relation violation
  P2015: 400, // Related record not found (устаревший)
  P2017: 400, // Database disconnect
  P2018: 400, // Could not connect
  P2019: 400, // Input error
  P2020: 400, // Value out of range
  P2021: 400, // Table does not exist
  P2022: 400, // Column does not exist
  P2023: 400, // Inconsistent column data
  P2024: 400, // Connection timeout
  P2026: 400, // Unsupported feature
  P2027: 400, // Multiple errors occurred

  // Unauthorized (если используется Prisma + права доступа)
  P3000: 401, // Database creation failed
  P3001: 401, // Migration failed
  P3002: 401, // Could not create migration
  P3003: 401, // Invalid database schema
  P3004: 401, // Database is not empty
  P3005: 401, // Database already exists

  // Forbidden
  P3006: 403, // Migration rollback failed
  P3007: 403, // Migration already applied
  P3008: 403, // Failed to apply migration
  P3009: 403, // Failed to rollback migration

  // Internal Server Error
  P4000: 500, // Data source error
  P4001: 500, // Transaction error
  P4002: 500, // Query engine error
} as const

export const errorMessageMap: Record<
  PrismaClientKnownRequestError['code'],
  PrismaClientKnownRequestError['message']
> = {
  // Not found errors
  P2025: 'Запись не найдена',
  P2016: 'Связанная запись не найдена',

  // Conflict errors
  P2002: 'Конфликт уникальности: запись уже существует',
  P2003: 'Ошибка внешнего ключа: связанная запись не найдена',

  // Bad Request errors
  P2000: 'Значение слишком длинное',
  P2001: 'Неверное условие фильтрации',
  P2004: 'Ошибка ограничения',
  P2005: 'Недопустимое значение поля',
  P2006: 'Недопустимое значение',
  P2007: 'Ошибка валидации данных',
  P2008: 'Ошибка парсинга запроса',
  P2009: 'Ошибка валидации запроса',
  P2010: 'Ошибка выполнения сырого запроса',
  P2011: 'Нарушение ограничения NULL',
  P2012: 'Отсутствует обязательное значение',
  P2013: 'Отсутствует обязательный аргумент',
  P2014: 'Ошибка связи между записями',
  P2015: 'Связанная запись не найдена',
  P2017: 'Отключение от базы данных',
  P2018: 'Не удалось подключиться',
  P2019: 'Ошибка ввода данных',
  P2020: 'Значение вне допустимого диапазона',
  P2021: 'Таблица не существует',
  P2022: 'Колонка не существует',
  P2023: 'Несогласованные данные колонки',
  P2024: 'Таймаут подключения',
  P2026: 'Неподдерживаемая функция',
  P2027: 'Произошло несколько ошибок',

  // Unauthorized
  P3000: 'Ошибка создания базы данных',
  P3001: 'Ошибка миграции',
  P3002: 'Не удалось создать миграцию',
  P3003: 'Неверная схема базы данных',
  P3004: 'База данных не пуста',
  P3005: 'База данных уже существует',

  // Forbidden
  P3006: 'Ошибка отката миграции',
  P3007: 'Миграция уже применена',
  P3008: 'Не удалось применить миграцию',
  P3009: 'Не удалось откатить миграцию',

  // Internal Server Error
  P4000: 'Ошибка источника данных',
  P4001: 'Ошибка транзакции',
  P4002: 'Ошибка движка запросов',
} as const

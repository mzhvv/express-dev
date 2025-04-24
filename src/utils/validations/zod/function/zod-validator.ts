// src/utils/validations/zod/function/zod-validator.ts

import type { ZodSchema } from 'zod'
import { z } from 'zod'

interface ZodValidator {
  uuid(id: string): string
  data<T>(data: unknown, schema: ZodSchema<T>): T
}
const zodValidator = {
  uuid: id => {
    const result = z.string().uuid().safeParse(id)
    if (!result.success) throw result.error

    return result.data
  },

  data: (data, schema) => {
    const result = schema.safeParse(data)
    if (!result.success) throw result.error

    return result.data
  },
} satisfies ZodValidator

export { zodValidator }

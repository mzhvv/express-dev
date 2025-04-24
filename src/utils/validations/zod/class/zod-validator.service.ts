// src/utils/validations/zod/class/zod-validator.service.ts

import type { ZodSchema } from 'zod'
import { z } from 'zod'

interface ZodValidator {
  uuid(id: string): string
  data<T>(data: unknown, schema: ZodSchema<T>): T
}

class ZodValidatorService implements ZodValidator {
  public uuid(id: string): string {
    const result = z.string().uuid().safeParse(id)
    if (!result.success) throw result.error
    return result.data
  }

  public data<T>(data: unknown, schema: ZodSchema<T>): T {
    const result = schema.safeParse(data)
    if (!result.success) throw result.error
    return result.data
  }
}

const zodValidator = new ZodValidatorService()
export { zodValidator }

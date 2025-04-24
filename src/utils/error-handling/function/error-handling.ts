// src/utils/error-handling/function/error-handling.ts

import type { Response } from 'express'
import { ZodError } from 'zod'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { errorMessageMap, errorStatusMap } from '../error-handling.constants'

interface ResponseZodError extends Pick<ZodError, 'message' | 'issues'> {
  code: 'ZOD_ERROR'
}
interface ResponsePrismaError extends Pick<PrismaClientKnownRequestError, 'message' | 'meta'> {
  code: PrismaClientKnownRequestError['code']
}
interface ResponseServerError extends Pick<Error, 'message'> {
  code: 'SERVER_ERROR'
}
interface ResponseUnknownError {
  code: 'UNKNOWN_ERROR'
  message: 'Unknown error'
}

type Errors = ZodError | PrismaClientKnownRequestError | Error | unknown
type ResponseErrors =
  | Response<ResponseZodError, Record<string, any>>
  | Response<ResponsePrismaError, Record<string, any>>
  | Response<ResponseServerError, Record<string, any>>
  | Response<ResponseUnknownError, Record<string, any>>

function errorHandling(error: Errors, res: Response): ResponseErrors {
  if (error instanceof ZodError) {
    return handlesError.zod(error, res)
  }
  if (error instanceof PrismaClientKnownRequestError) {
    return handlesError.prisma(error, res)
  }
  if (error instanceof Error) {
    return handlesError.server(error, res)
  }
  return handlesError.unknown(error, res)
}

interface HandlesError {
  zod: (error: ZodError, res: Response) => Response<ResponseZodError>
  prisma: (error: PrismaClientKnownRequestError, res: Response) => Response<ResponsePrismaError>
  server: (error: Error, res: Response) => Response<ResponseServerError>
  unknown: (error: unknown, res: Response) => Response<ResponseUnknownError>
}
const handlesError: HandlesError = {
  zod: (error, res): Response<ResponseZodError> => {
    const response: ResponseZodError = {
      code: 'ZOD_ERROR',
      message: error.message,
      issues: error.issues,
    }

    console.log('ZOD_ERROR', error)
    return res.status(400).json(response)
  },

  prisma: (error, res) => {
    const httpStatus = errorStatusMap[error.code] ?? (error.code?.startsWith('P') ? 400 : 500)

    const response = {
      code: `PRISMA_ERROR (${error.code})`,
      message: error.message ?? errorMessageMap[error.code],
      meta: error.meta,
    }

    console.log(`PRISMA_ERROR (${error.code})`, error)
    return res.status(httpStatus).json(response)
  },

  server: (error, res) => {
    const response: ResponseServerError = {
      code: 'SERVER_ERROR',
      message: error.message,
    }

    console.log('SERVER_ERROR', error)
    return res.status(500).json(response)
  },

  unknown: (error, res) => {
    const response: ResponseUnknownError = {
      code: 'UNKNOWN_ERROR',
      message: 'Unknown error',
    }

    console.log('UNKNOWN_ERROR', error)
    return res.status(500).json(response)
  },
}

export { errorHandling, handlesError }

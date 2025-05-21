import cors from '@fastify/cors'
import config from '../config/env'
import { FastifyInstance } from 'fastify'
import AuthorizationError from '../exceptions/AuthorizationError'

export default async function (fastify: FastifyInstance, opts: object = {}) {
  fastify.register(cors, {
    origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
      if (config.ENABLE_CORS === false) {
        callback(null, true)
        return
      }

      if (config.ALLOWED_ORIGIN.includes(origin || '')) {
        callback(null, true)
        return
      }

      callback(new AuthorizationError('Not allowed'), false)
    }
  })
}
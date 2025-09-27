import fastifyRateLimit from '@fastify/rate-limit'
import AuthorizationError from '../exceptions/AuthorizationError'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import config from '../config/env'

const bannedIps = new Set<string>()

export default async function (fastify: FastifyInstance, opts: object = {}) {
  if (config.ENABLE_RATE_LIMITER === false) return

  const rateLimitConfig = {
    global: true,
    max: async (request: FastifyRequest, key: string): Promise<number> => {
      if (bannedIps.has(key)) {
        throw new AuthorizationError('Your IP has been banned')
      }

      return 10
    },
    timeWindow: '10 seconds',
    continueExceeding: false,
    ban: 5,
    onBanReach: (req: FastifyRequest, key: string): void => {
      bannedIps.add(key)
      fastify.log.info(`Ban IP: ${key}`)
    }
  }

  await fastify.register(fastifyRateLimit, rateLimitConfig)

  await fastify.setNotFoundHandler({
    preHandler: fastify.rateLimit()
  }, function (request: FastifyRequest, reply: FastifyReply) {
    reply.callNotFound()
  })
}


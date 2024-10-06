const fastifyRateLimit = require('@fastify/rate-limit')
const AuthorizationError = require('../exceptions/AuthorizationError')
const bannedIps = new Set()

module.exports = async function (fastify, opts) {
  const rateLimitConfig = {
    global: true,
    max: async (request, key) => {
      if (bannedIps.has(key)) {
        throw new AuthorizationError('Your IP has been banned')
      }

      return 10
    },
    timeWindow: '10 seconds',
    continueExceeding: false,
    ban: 5,
    onBanReach: function (req, key) {
      bannedIps.add(key)
      console.log(`ban ip ${key}`)
    }
  }

  await fastify.register(fastifyRateLimit, rateLimitConfig)

  await fastify.setNotFoundHandler({
    preHandler: fastify.rateLimit(rateLimitConfig)
  }, function (request, reply) {
    reply.callNotFound()
  })
}

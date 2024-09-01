const fastify = require('fastify')({
  logger: true,
  ajv: {
    // reference: https://fastify.dev/docs/latest/Reference/Server/#ajv
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: false
    }
  }
})
const config = require('../config.json')

const RateLimiter = require('./middlewares/RateLimiter');
const CORS = require('./middlewares/CORS');

RateLimiter(fastify)
CORS(fastify)

fastify.setErrorHandler(function (error, request, reply) {
  const statusCode = error.statusCode
  let response

  const { validation, validationContext } = error

  if (validation) {
    response = {
      statusCode: 400,
      message: `A validation error occurred when validating the ${validationContext}...`,
      data: validation
    }
  } else {
    throw error
  }

  reply.status(statusCode).send(response)
})

const pingDomain = require('./domains/ping/routes');

fastify.register(pingDomain.routes, pingDomain.options)

fastify.listen({ port: config.PORT || 3000 })

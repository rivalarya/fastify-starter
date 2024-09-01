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

const cors = require('@fastify/cors')
const AuthorizationError = require('./exceptions/AuthorizationError')
fastify.register(cors, {
  origin: (origin, cb) => {
    if (config.ENABLE_CORS === false) {
      cb(null, true)
      return
    }

    if (config.ALLOWED_ORIGIN.includes(origin)) {
      cb(null, true)
      return
    }

    cb(new AuthorizationError('Not allowed'))
  }
})

const pingDomain = require('./domains/ping/routes')

fastify.register(pingDomain.routes, pingDomain.options)

fastify.listen({ port: config.PORT || 3000 })

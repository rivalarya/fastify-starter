// create folder logs and file http.log on pwd if dont exist
const logFilePath = 'logs/http.log'
const fs = require('fs')
if (!fs.existsSync(logFilePath)) {
  fs.mkdirSync('logs')
  fs.writeFileSync(logFilePath, '')
}

const fastify = require('fastify')({
  // reference: https://fastify.dev/docs/latest/Reference/Logging/#logging
  logger: {
    level: 'info',
    file: 'logs/http.log',
    serializers: {
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers
        }
      }
    }
  },
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

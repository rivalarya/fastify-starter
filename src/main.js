const fastify = require('fastify')({
  logger: true
})
const config = require('../config.json')

/**
 * By default, coerceTypes: true. It means that if you create a request validation, for example: {id: { type: 'string' }} and the user passes the id as an integer, the framework will not return an error but will cast the integer to a string. But if you set coerceTypes: false, it will return an error. https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validator-compiler
 */
// const Ajv = require('ajv')
// const ajv = new Ajv({
//   coerceTypes: false,
// })
// fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
//   return ajv.compile(schema)
// })

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

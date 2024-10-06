const cors = require('@fastify/cors')
const AuthorizationError = require('../exceptions/AuthorizationError')
const config = require('../../config.json')

module.exports = async function (fastify, opts) {
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
}

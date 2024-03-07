const fastify = require('fastify')({
  logger: true
})
const config = require('../config.json')

const pingDomain = require('./domains/ping/routes')

fastify.register(pingDomain.routes, pingDomain.options)

fastify.listen({ port: config.PORT || 3000 })

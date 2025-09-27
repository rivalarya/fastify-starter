import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { getPing, postPing } from './handler'
import { getPingSchema, postPingSchema } from './routesSchema'

const ping: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', {
    handler: getPing,
    schema: getPingSchema,
    logLevel: 'silent'
  })

  fastify.post('/ping', {
    handler: postPing,
    schema: postPingSchema,
    logLevel: 'silent'
  })
}

export default ping


import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { getPing } from './handler'
import { getMessagesSchema } from './routesSchema'

const ping: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', {
    handler: getPing,
    schema: getMessagesSchema
  })
}

export default ping


import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { getPing } from './handler'

const ping: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/ping', {
    handler: getPing,
  })
}

export default ping


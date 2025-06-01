import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { register, login, me } from './handler'
import { registerSchema, loginSchema, meSchema } from './routesSchema'

const auth: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // Public routes
  fastify.post('/register', { schema: registerSchema, handler: register })
  fastify.post('/login', { schema: loginSchema, handler: login })

  // Protected routes
  fastify.get('/me', {
    schema: meSchema,
    preHandler: fastify.authenticate,
    handler: me
  })
}

export default auth

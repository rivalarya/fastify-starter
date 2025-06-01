import { FastifyInstance } from 'fastify'
import jwt from '@fastify/jwt'
import config from '../config/env'
import AuthenticationError from '../exceptions/AuthenticationError'

export default async function (fastify: FastifyInstance, opts: object = {}) {
  fastify.register(jwt, {
    secret: config.JWT_SECRET,
    sign: {
      expiresIn: config.JWT_EXPIRES_IN
    }
  })

  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify()
    } catch (err) {
      throw new AuthenticationError('Invalid token')
    }
  })
}

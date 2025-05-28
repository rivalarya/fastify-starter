import fastify, { FastifyInstance } from 'fastify'
import CORS from '../src/middlewares/CORS'
import RateLimiter from '../src/middlewares/RateLimiter'

describe('Middlewares Tests', () => {
  describe('CORS Middleware', () => {
    let server: FastifyInstance

    beforeEach(() => {
      server = fastify()
    })

    afterEach(async () => {
      await server.close()
    })

    it('should register CORS middleware without errors', async () => {
      await expect(CORS(server)).resolves.not.toThrow()
    })
  })

  describe('RateLimiter Middleware', () => {
    let server: FastifyInstance

    beforeEach(() => {
      server = fastify()
    })

    afterEach(async () => {
      await server.close()
    })

    it('should register RateLimiter middleware without errors', async () => {
      await expect(RateLimiter(server)).resolves.not.toThrow()
    })
  })
})
import { registerAllRoutes } from '../src/utils/routeMapper'
import fastify, { FastifyInstance } from 'fastify'

describe('Route Mapper Tests', () => {
  let server: FastifyInstance

  beforeEach(() => {
    server = fastify()
  })

  afterEach(async () => {
    await server.close()
  })

  it('should register routes without errors', async () => {
    await expect(registerAllRoutes(server)).resolves.not.toThrow()
  })

  it('should register ping routes', async () => {
    await registerAllRoutes(server)
    await server.ready()

    const response = await server.inject({
      method: 'GET',
      url: '/ping'
    })

    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body).toEqual({
      data: {},
      message: 'Pong'
    })
  })
})
import app from '../src/main'
import request from 'supertest'
import config from '../src/config/env'

describe('Integration Tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  describe('Server Health', () => {
    it('should start server without errors', () => {
      expect(app).toBeDefined()
    })

    it('should respond to ping endpoint', async () => {
      const response = await request(app.server)
        .get('/ping')
        .set('Origin', config.ALLOWED_ORIGIN[0])
        .expect(200)

      expect(response.body).toEqual({
        data: {},
        message: 'Pong'
      })
    })
  })

  describe('Content-Type Headers', () => {
    it('should return JSON content-type for API responses', async () => {
      const response = await request(app.server)
        .get('/ping')
        .set('Origin', config.ALLOWED_ORIGIN[0])
        .expect('Content-Type', /json/)

      expect(response.headers['content-type']).toMatch(/application\/json/)
    })
  })

  describe('Response Structure', () => {
    it('should return standardized response format', async () => {
      const response = await request(app.server)
        .get('/ping')
        .set('Origin', config.ALLOWED_ORIGIN[0])
        .expect(200)

      expect(response.body).toHaveProperty('data')
      expect(response.body).toHaveProperty('message')
      expect(typeof response.body.data).toBe('object')
      expect(typeof response.body.message).toBe('string')
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
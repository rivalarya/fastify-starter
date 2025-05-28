import app from '../src/main'
import request from 'supertest'
import config from '../src/config/env'

describe('Error Handling Tests', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app.server)
      .get('/nonexistent')
      .set('Origin', config.ALLOWED_ORIGIN[0])
      .expect(404)
      .expect('Content-Type', /text/)

    expect(response.text).toBe('404 Not Found')
  })

  afterAll(async () => {
    await app.close()
  })
})
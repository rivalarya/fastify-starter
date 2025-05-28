import app from '../src/main'
import request from 'supertest'
import config from '../src/config/env'

describe('Test /ping route', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should return 429 and the correct response after hitting 20 times', async () => {
    // cek dulu max request di middlewares/RateLimiter.ts
    for (let i = 0; i < 10; i++) {
      await request(app.server)
        .get('/ping')
        .set('Origin', config.ALLOWED_ORIGIN[0]) // for allowing cors
    }

    const response = await request(app.server)
      .get('/ping')
      .set('Origin', config.ALLOWED_ORIGIN[0]) // for allowing cors
      .expect(429)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({ data: {}, message: "Rate limit exceeded, retry in 10 seconds" })
  })

  afterAll(async () => {
    await app.close()
  })
})



import app from '../src/main'
import request from 'supertest'
import config from '../src/config/env'

describe('Test /ping route', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should return 200 and the correct response', async () => {
    const response = await request(app.server)
      .get('/ping')
      .set('Origin', config.ALLOWED_ORIGIN[0]) // for allowing cors
      .expect(200)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({
      data: {},
      message: 'Pong'
    })
  })

  afterAll(async () => {
    await app.close()
  })
})



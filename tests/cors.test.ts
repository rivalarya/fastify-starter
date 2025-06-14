import app from '../src/main'
import request from 'supertest'

describe('Test /ping route with CORS enabled', () => {
  beforeAll(async () => {
    await app.ready()
  })

  it('should return 403 and the correct response', async () => {
    const response = await request(app.server)
      .get('/ping')
      .expect(403)
      .expect('Content-Type', /json/)

    expect(response.body).toEqual({
      data: {},
      message: 'Not allowed'
    })
  })

  afterAll(async () => {
    await app.close()
  })
})


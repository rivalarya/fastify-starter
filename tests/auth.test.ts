import { describe, it, expect, beforeAll, afterAll } from '@jest/globals'
import { FastifyInstance } from 'fastify'
import mongoose from 'mongoose'
import { User } from '../src/models/User'
import server from '../src/main'

describe('Authentication Routes', () => {
  let app: FastifyInstance

  beforeAll(async () => {
    app = server
    // Clear users collection before tests
    await User.deleteMany({})
  })

  afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
    await app.close()
  })

  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  }

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: testUser,
        headers: { origin: 'https://example.com' }
      })

      expect(response.statusCode).toBe(201)
      const body = JSON.parse(response.payload)
      expect(body.message).toBe('User registered successfully')
      expect(body.data.token).toBeDefined()
      expect(body.data.user.email).toBe(testUser.email)
      expect(body.data.user.name).toBe(testUser.name)
      expect(body.data.user.password).toBeUndefined()
    })

    it('should not register a user with existing email', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: testUser,
        headers: { origin: 'https://example.com' }
      })

      expect(response.statusCode).toBe(400)
      const body = JSON.parse(response.payload)
      expect(body.message).toBe('Email already registered')
    })
  })

  describe('POST /auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: testUser.email,
          password: testUser.password
        },
        headers: { origin: 'https://example.com' }
      })

      expect(response.statusCode).toBe(200)
      const body = JSON.parse(response.payload)
      expect(body.message).toBe('Login successful')
      expect(body.data.token).toBeDefined()
      expect(body.data.user.email).toBe(testUser.email)
    })

    it('should fail with incorrect password', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: testUser.email,
          password: 'wrongpassword'
        },
        headers: { origin: 'https://example.com' }
      })

      expect(response.statusCode).toBe(401)
      const body = JSON.parse(response.payload)
      expect(body.message).toBe('Invalid email or password')
    })
  })

  describe('GET /auth/me', () => {
    let token: string

    beforeAll(async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
          email: testUser.email,
          password: testUser.password
        },
        headers: { origin: 'https://example.com' }
      })
      const body = JSON.parse(response.payload)
      token = body.data.token
    })

    it('should get user profile with valid token', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/auth/me',
        headers: {
          authorization: `Bearer ${token}`,
          origin: 'https://example.com'
        }
      })

      expect(response.statusCode).toBe(200)
      const body = JSON.parse(response.payload)
      expect(body.message).toBe('User profile retrieved successfully')
      expect(body.data.user.email).toBe(testUser.email)
      expect(body.data.user.name).toBe(testUser.name)
    })

    it('should fail with invalid token', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/auth/me',
        headers: {
          authorization: 'Bearer invalid-token',
          origin: 'https://example.com'
        }
      })

      expect(response.statusCode).toBe(401)
      const body = JSON.parse(response.payload)
      expect(body.message).toBe('Invalid token')
    })
  })
})

import dotenv from 'dotenv'
import path from 'path'
import mongoose from 'mongoose'

dotenv.config({
  path: path.resolve(process.cwd(), '.env.test'),
  override: true
})

process.env.NODE_ENV = 'test'
process.env.MONGODB_URI = 'mongodb://localhost:27017/fastify-starter-test'

// Connect to test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string)
})

// Cleanup after tests
afterAll(async () => {
  // Drop the database only if the connection is open
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  }
})
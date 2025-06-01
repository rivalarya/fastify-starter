import dotenvSafe from 'dotenv-safe'
import path from 'path'

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenvSafe.config({
  path: path.resolve(process.cwd(), envFile),
  example: path.resolve(process.cwd(), '.env.example'),
  allowEmptyValues: false
})

const defaultConfig = {
  PORT: 4000,
  ENABLE_CORS: false,
  ALLOWED_ORIGIN: ['https://example.com'],
  ENABLE_RATE_LIMITER: false,
  MONGODB_URI: 'mongodb://localhost:27017/fastify-starter',
  JWT_SECRET: 'your-super-secret-key-change-in-production',
  JWT_EXPIRES_IN: '1d',
}

// For test environment, enable everything by default
const testDefaults = process.env.NODE_ENV === 'test' ? {
  ENABLE_CORS: true,
  ENABLE_RATE_LIMITER: true,
} : {}

const config = {
  PORT: parseInt(process.env.PORT || String(defaultConfig.PORT), 10),
  ENABLE_CORS: process.env.ENABLE_CORS === 'true' || (process.env.NODE_ENV === 'test' && testDefaults.ENABLE_CORS),
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : defaultConfig.ALLOWED_ORIGIN,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ENABLE_RATE_LIMITER: process.env.ENABLE_RATE_LIMITER === 'true' || (process.env.NODE_ENV === 'test' && testDefaults.ENABLE_RATE_LIMITER),
  MONGODB_URI: process.env.MONGODB_URI || defaultConfig.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET || defaultConfig.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || defaultConfig.JWT_EXPIRES_IN
}

export default config
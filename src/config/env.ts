import dotenv from 'dotenv'
import path from 'path'

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenv.config({
  path: path.resolve(process.cwd(), envFile),
  override: true
})

const defaultConfig = {
  PORT: 4000,
  ENABLE_CORS: false,
  ALLOWED_ORIGIN: ['https://example.com'],
  ENABLE_RATE_LIMITER: false,
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
  ENABLE_RATE_LIMITER: process.env.ENABLE_RATE_LIMITER === 'true' || (process.env.NODE_ENV === 'test' && testDefaults.ENABLE_RATE_LIMITER)
}

export default config
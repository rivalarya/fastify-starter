import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const defaultConfig = {
  PORT: 4000,
  ENABLE_CORS: false,
  ALLOWED_ORIGIN: ['https://example.com'],
  ENABLE_RATE_LIMITER: false,
}

const config = {
  PORT: parseInt(process.env.PORT || String(defaultConfig.PORT), 10),
  ENABLE_CORS: process.env.ENABLE_CORS === 'true',
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',') : defaultConfig.ALLOWED_ORIGIN,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ENABLE_RATE_LIMITER: process.env.ENABLE_RATE_LIMITER === 'true'
}

export default config
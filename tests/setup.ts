import dotenvSafe from 'dotenv-safe'
import path from 'path'

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenvSafe.config({
  path: path.resolve(process.cwd(), envFile),
  example: path.resolve(process.cwd(), '.env.example'),
  allowEmptyValues: false
})

process.env.NODE_ENV = 'test'
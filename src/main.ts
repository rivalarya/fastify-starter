// create folder logs and file http.log on pwd if dont exist
import * as fs from 'fs'
const logFilePath = 'logs/http.log'
if (!fs.existsSync(logFilePath)) {
  fs.mkdirSync('logs')
  fs.writeFileSync(logFilePath, '')
}

import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyLoggerOptions } from 'fastify'
import config from '../config.json'

const server = fastify({
  logger: {
    level: 'info',
    file: 'logs/http.log',
    serializers: {
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          headers: req.headers
        }
      }
    }
  } as FastifyLoggerOptions,
  ajv: {
    customOptions: {
      removeAdditional: 'all',
      coerceTypes: false
    }
  }
})

import RateLimiter from './middlewares/RateLimiter'
import CORS from './middlewares/CORS'

RateLimiter(server)
CORS(server)

server.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  const statusCode = error.statusCode || 500
  let response

  const { validation, validationContext } = error

  if (validation) {
    response = {
      statusCode: 400,
      message: `A validation error occurred when validating the ${validationContext}...`,
      data: validation
    }
  } else {
    throw error
  }

  reply.status(statusCode).send(response)
})

import pingDomain from './domains/ping/routes'

server.register(pingDomain, {prefix: '/'})

server.listen({ 
  port: config.PORT || 3000,
  host: '0.0.0.0'
}, (err: Error | null, address: string) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`Server listening at ${address}`)
  console.log(`Server listening at ${address}`)
})

export default server


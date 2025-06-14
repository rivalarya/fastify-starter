// create folder logs and file http.log on pwd if dont exist
import * as fs from 'fs'
const logFilePath = 'logs/http.log'
if (!fs.existsSync(logFilePath)) {
  fs.mkdirSync('logs')
  fs.writeFileSync(logFilePath, '')
}

import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { FastifyLoggerOptions } from 'fastify'
import config from './config/env'
import { registerAllRoutes } from './utils/routeMapper'

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
import IStandarResponse from './domains/standarResponse'

// Apply middlewares
RateLimiter(server)
CORS(server)

// Global error handler
server.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  const statusCode = error.statusCode || 500
  let response: IStandarResponse

  const { validation, validationContext } = error
  if (validation) {
    response = {
      message: `A validation error occurred when validating the ${validationContext}...`,
      data: validation
    }
  } else {
    response = {
      message: error.message || error.name,
      data: {}
    }
    return reply.status(statusCode).send(response)
  }

  reply.status(statusCode).send(response)
})

// Auto-register all route modules
registerAllRoutes(server)
  .then(() => {
    server.listen({
      port: config.PORT,
      host: '0.0.0.0'
    }, (err: Error | null, address: string) => {
      if (err) {
        server.log.error(err)
        process.exit(1)
      }

      server.log.info(`Server listening at ${address}`)
      console.log(`Server listening at ${address}`)
    })
  })
  .catch(err => {
    server.log.error('Failed to register routes', err)
    process.exit(1)
  })

export default server
import { FastifyRequest, FastifyReply } from 'fastify'
import IStandarResponse from '../standarResponse'

async function getPing (request: FastifyRequest, reply: FastifyReply) {
  const response: IStandarResponse = {
    statusCode: 200,
    data: {},
    message: 'Pong'
  }

  reply.send(response)
}

export {
  getPing
}

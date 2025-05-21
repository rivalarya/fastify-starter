import { FastifyRequest, FastifyReply } from 'fastify'
import IStandarResponse from '../standarResponse'

async function getPing (request: FastifyRequest, reply: FastifyReply) {
  const response: IStandarResponse = {
    message: 'Pong',
    data: {},
  }

  reply.send(response)
}

export {
  getPing
}

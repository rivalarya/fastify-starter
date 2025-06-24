import { FastifyRequest, FastifyReply } from 'fastify'
import IStandarResponse from '../standarResponse'

async function getPing (request: FastifyRequest, reply: FastifyReply) {
  const response: IStandarResponse = {
    message: 'Pong',
    data: {},
  }

  reply.send(response)
}

interface IPostPingBody {
  message: string
}

async function postPing (request: FastifyRequest, reply: FastifyReply) {
  const { message } = request.body as IPostPingBody

  const response: IStandarResponse = {
    message,
    data: {},
  }

  reply.send(response)
}

export {
  getPing,
  postPing
}

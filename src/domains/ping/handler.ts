import { FastifyRequest, FastifyReply } from 'fastify'
import IStandardResponse from 'src/types/standardResponse'

async function getPing (request: FastifyRequest, reply: FastifyReply) {
  const response: IStandardResponse = {
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

  const response: IStandardResponse = {
    message,
    data: {},
  }

  reply.send(response)
}

export {
  getPing,
  postPing
}

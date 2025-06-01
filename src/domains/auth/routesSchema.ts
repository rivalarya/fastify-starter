import { FastifySchema } from 'fastify'

export interface IRegisterBody {
  email: string
  password: string
  name: string
}

export interface ILoginBody {
  email: string
  password: string
}

export const registerSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 6
      },
      name: {
        type: 'string',
        minLength: 2
      }
    },
    additionalProperties: false
  }
}

export const loginSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string'
      }
    },
    additionalProperties: false
  }
}

export const meSchema: FastifySchema = {
  headers: {
    type: 'object',
    required: ['authorization'],
    properties: {
      authorization: {
        type: 'string',
        pattern: '^Bearer .+'
      }
    }
  }
}

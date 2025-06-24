/**
 * Reference: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validation
 *
 * Usage example in TypeScript.
 */

import { FastifySchema } from 'fastify'

export const getPingSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      fromId: { type: 'string' },
      toId: { type: 'string' }
    },
    required: [],
    additionalProperties: false
  }
}

export const postPingSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['message'],
    properties: {
      message: { type: 'string' }
    },
    additionalProperties: false
  }
}
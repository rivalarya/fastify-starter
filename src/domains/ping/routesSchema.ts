/**
 * Reference: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validation
 *
 * Usage example in TypeScript.
 */

import { FastifySchema } from 'fastify'

export const getMessagesSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      fromId: { type: 'string' },
      toId: { type: 'string' }
    },
    required: [],
    additionalProperties: false
  },
  // body: {
  //   type: 'object',
  //   required: ['fromId', 'toId', 'message'],
  //   properties: {
  //     fromId: { type: 'string' },
  //     toId: { type: 'string' },
  //     message: { type: 'string' }
  //   },
  //   additionalProperties: false
  // }
}
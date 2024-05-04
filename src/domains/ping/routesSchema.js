/**
 * Referrence: https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#validation
 *
 * Usage example.
 * const getMessagesSchema = {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        fromId: { type: 'string' },
        toId: { type: 'string' }
      }
    },
    body: {
      type: 'object',
      required: ['fromId', 'toId', 'message'],
      properties: {
        fromId: { type: 'string' },
        toId: { type: 'string' },
        message: { type: 'string' }
      }
    }
  }
}

module.exports = {
  getMessagesSchema,
}
 */

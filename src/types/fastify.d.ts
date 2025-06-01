import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      id: string
      email: string
      iat?: number
      exp?: number
    }
    user: {
      id: string
      email: string
      iat?: number
      exp?: number
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any
  }
}

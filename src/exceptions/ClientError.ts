export default class ClientError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)

    if (new.target === ClientError) {
      throw new Error('Cannot instantiate abstract class')
    }

    this.statusCode = statusCode
    this.name = 'ClientError'
  }
}


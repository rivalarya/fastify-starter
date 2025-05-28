import AuthenticationError from '../src/exceptions/AuthenticationError'
import AuthorizationError from '../src/exceptions/AuthorizationError'
import InvariantError from '../src/exceptions/InvariantError'
import NotFoundError from '../src/exceptions/NotFoundError'
import ClientError from '../src/exceptions/ClientError'

describe('Exception Classes Tests', () => {
  describe('AuthenticationError', () => {
    it('should create AuthenticationError with correct properties', () => {
      const message = 'Authentication failed'
      const error = new AuthenticationError(message)

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ClientError)
      expect(error.message).toBe(message)
      expect(error.statusCode).toBe(401)
      expect(error.name).toBe('AuthenticationError')
    })
  })

  describe('AuthorizationError', () => {
    it('should create AuthorizationError with correct properties', () => {
      const message = 'Access denied'
      const error = new AuthorizationError(message)

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ClientError)
      expect(error.message).toBe(message)
      expect(error.statusCode).toBe(403)
      expect(error.name).toBe('AuthorizationError')
    })
  })

  describe('InvariantError', () => {
    it('should create InvariantError with correct properties', () => {
      const message = 'Invalid input'
      const error = new InvariantError(message)

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ClientError)
      expect(error.message).toBe(message)
      expect(error.statusCode).toBe(400)
      expect(error.name).toBe('InvariantError')
    })
  })

  describe('NotFoundError', () => {
    it('should create NotFoundError with correct properties', () => {
      const message = 'Resource not found'
      const error = new NotFoundError(message)

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ClientError)
      expect(error.message).toBe(message)
      expect(error.statusCode).toBe(404)
      expect(error.name).toBe('NotFoundError')
    })
  })

  describe('ClientError', () => {
    it('should not allow direct instantiation', () => {
      expect(() => {
        new ClientError('test message')
      }).toThrow('Cannot instantiate abstract class')
    })

    it('should allow inheritance with custom status code', () => {
      class CustomError extends ClientError {
        constructor(message: string) {
          super(message, 422)
          this.name = 'CustomError'
        }
      }

      const error = new CustomError('Custom error message')
      expect(error.statusCode).toBe(422)
      expect(error.message).toBe('Custom error message')
      expect(error.name).toBe('CustomError')
    })
  })
})
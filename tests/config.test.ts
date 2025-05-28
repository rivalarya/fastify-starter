import config from '../src/config/env'

describe('Configuration Tests', () => {
  it('should have default PORT value', () => {
    expect(config.PORT).toBeDefined()
    expect(typeof config.PORT).toBe('number')
  })

  it('should have ENABLE_CORS boolean value', () => {
    expect(typeof config.ENABLE_CORS).toBe('boolean')
  })

  it('should have ALLOWED_ORIGIN as array', () => {
    expect(Array.isArray(config.ALLOWED_ORIGIN)).toBe(true)
    expect(config.ALLOWED_ORIGIN.length).toBeGreaterThan(0)
  })

  it('should have NODE_ENV defined', () => {
    expect(config.NODE_ENV).toBeDefined()
    expect(typeof config.NODE_ENV).toBe('string')
  })

  it('should have ENABLE_RATE_LIMITER boolean value', () => {
    expect(typeof config.ENABLE_RATE_LIMITER).toBe('boolean')
  })
})
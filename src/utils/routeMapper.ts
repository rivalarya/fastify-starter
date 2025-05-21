import fs from 'fs'
import path from 'path'
import { FastifyInstance } from 'fastify'

/**
 * Automatically registers all route modules from the domains directory
 * @param fastify - The Fastify instance
 */
export async function registerAllRoutes(fastify: FastifyInstance): Promise<void> {
  const domainsDir = path.join(__dirname, '../domains')

  try {
    const domains = fs.readdirSync(domainsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const domain of domains) {
      try {
        const routesPath = path.join(domainsDir, domain, 'routes')

        if (!fs.existsSync(`${routesPath}.ts`) && !fs.existsSync(`${routesPath}.js`)) {
          fastify.log.warn(`No routes module found for domain: ${domain}`)
          continue
        }

        const routeModule = await import(`../domains/${domain}/routes`)

        await fastify.register(routeModule.default, { prefix: `/${domain === 'ping' ? '' : domain}` })

        fastify.log.info(`Registered routes for domain: ${domain}`)
      } catch (error) {
        fastify.log.error(`Failed to register routes for domain: ${domain}`, error)
      }
    }
  } catch (error) {
    fastify.log.error('Failed to read domains directory', error)
    throw error
  }
}
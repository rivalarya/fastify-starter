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
    const entries = fs.readdirSync(domainsDir, { withFileTypes: true })
    console.log('Domain entries:', entries.map(e => e.name))

    const versionFolders = entries
      .filter(dirent => dirent.isDirectory() && dirent.name.match(/^v\d+$/))
      .map(dirent => dirent.name)

    const regularDomains = entries
      .filter(dirent => dirent.isDirectory() && !dirent.name.match(/^v\d+$/))
      .map(dirent => dirent.name)

    console.log('Version folders:', versionFolders)
    console.log('Regular domains:', regularDomains)

    // Register versioned routes if any version folders exist
    if (versionFolders.length > 0) {
      for (const version of versionFolders) {
        await registerVersionedRoutes(fastify, domainsDir, version)
      }
    }

    // Always register non-versioned routes if regular domain folders exist
    if (regularDomains.length > 0) {
      await registerDomainRoutes(fastify, domainsDir, regularDomains)
    }

  } catch (error) {
    fastify.log.error('Failed to read domains directory', error)
    throw error
  }
}

async function registerVersionedRoutes(
  fastify: FastifyInstance,
  domainsDir: string,
  version: string
): Promise<void> {
  const versionDir = path.join(domainsDir, version)

  try {
    const domains = fs.readdirSync(versionDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)

    for (const domain of domains) {
      try {
        const routesPath = path.join(versionDir, domain, 'routes')

        if (!fs.existsSync(`${routesPath}.ts`) && !fs.existsSync(`${routesPath}.js`)) {
          fastify.log.warn(`No routes module found for ${version}/${domain}`)
          continue
        }

        const routeModule = await import(`../domains/${version}/${domain}/routes`)
        const domainPrefix = domain === 'ping' ? '' : `/${domain}`
        const fullPrefix = `/${version}${domainPrefix}`

        await fastify.register(routeModule.default, {
          prefix: fullPrefix
        })

        console.info(`Registered ${version} routes for domain: ${domain} at ${fullPrefix}`)
      } catch (error) {
        console.error(`Failed to register ${version} routes for domain: ${domain}`, error)
      }
    }
  } catch (error: unknown) {
    fastify.log.warn(`Version directory ${version} not accessible:`, error)
  }
}

async function registerDomainRoutes(
  fastify: FastifyInstance,
  domainsDir: string,
  domains: string[]
): Promise<void> {
  for (const domain of domains) {
    try {
      const routesPath = path.join(domainsDir, domain, 'routes')

      if (!fs.existsSync(`${routesPath}.ts`) && !fs.existsSync(`${routesPath}.js`)) {
        fastify.log.warn(`No routes module found for domain: ${domain}`)
        continue
      }

      const routeModule = await import(`../domains/${domain}/routes`)
      const domainPrefix = domain === 'ping' ? '' : `/${domain}`

      await fastify.register(routeModule.default, {
        prefix: domainPrefix
      })

      console.info(`Registered routes for domain: ${domain} at ${domainPrefix || '/'}`)
    } catch (error) {
      console.error(`Failed to register routes for domain: ${domain}`, error)
    }
  }
}
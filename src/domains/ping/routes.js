const { getPing } = require('./handler')

const ping = {
  options: {
    prefix: ''
  },
  routes: (fastify, opts, done) => {
    fastify.get('/ping', getPing)
    done()
  }
}

module.exports = ping
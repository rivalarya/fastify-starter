const InvariantError = require("../../exceptions/InvariantError")
const standarResponse = require("../standarResponse")

async function getPing(request, reply) {
  const response = {
    ...standarResponse,
    message: 'Pong'
  }

  reply.send(response)
}


module.exports = {
  getPing
}
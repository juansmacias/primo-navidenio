import Hapi from '@hapi/hapi'
import hapiAuthJWT from 'hapi-auth-jwt2'

import authPlugin from './plugins/auth'
import userPlugin from './plugins/users'
import emailPlugin from './plugins/email'
import prismaPlugin from './plugins/prisma'
import statusPlugin from './plugins/status'

const server: Hapi.Server = Hapi.server({
  port: process.env.PORT || 3030,
  host: process.env.HOST || 'localhost',
  routes: {
    cors: {
      origin:['*'],
      additionalHeaders: ['Authorization','Content-Type','Access-Control-Allow-Origin'], // an array of strings - 'Access-Control-Allow-Headers'
      additionalExposedHeaders: ['Authorization']
    }
  } 
})

export async function createServer(): Promise<Hapi.Server> {

  const pianoOptions = {
    logEvents: (process.env.CI === 'true' || process.env.TEST === 'true') ? false : undefined,
    prettyPrint: process.env.NODE_ENV !== 'production',
    // Redact Authorization headers, see https://getpino.io/#/docs/redaction
    redact: ['req.headers.authorization'],
  }

  await server.register({
    plugin: require('hapi-pino'),
    options: pianoOptions
  })
  
  await server.register(
    [ hapiAuthJWT,
      statusPlugin,
      authPlugin,
      prismaPlugin,
      userPlugin,
      emailPlugin,
    ])

  await server.initialize()

  return server
}
  
export async function startServer(server: Hapi.Server): Promise<Hapi.Server> {
  await server.start()
  console.log(`Server running on ${server.info.uri}`)
  return server
}


process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
  })
import Hapi from '@hapi/hapi'

import { createServer } from '../src/server'
import { seedTips } from '../src/seed/seeddata'
import { createTips, destroyAllPromise } from '../src/seed/seedUtils'



describe('Tips plugin', () => {
    let server: Hapi.Server
    const OLD_ENV = process.env;
  
    beforeAll(async () => {
      server = await createServer()
      setTestFlag(OLD_ENV)
  
    })
  
    afterAll(async () => {
      const { prisma } = server.app
      await destroyAllPromise(prisma)

      await server.stop()
      process.env = OLD_ENV
    })
  
    test('status endpoint returns 204', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/tips',
      })
      expect(res.statusCode).toEqual(204)
    })

    test('status endpoint returns 200', async () => {
      const { prisma } = server.app
      seedTips.forEach(async (e) =>{
        await createTips(prisma,e.question)
      })

      const res = await server.inject({
        method: 'GET',
        url: '/tips',
      })
      expect(res.statusCode).toEqual(200)
      const response = JSON.parse(res.payload)
      expect(response.length).toEqual(9)
    })

  })
  
  export function setTestFlag(env:NodeJS.ProcessEnv){
      jest.resetModules();
      process.env = { ...env };
      process.env.TEST = 'true'
      process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
  }
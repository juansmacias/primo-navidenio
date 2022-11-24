import { createServer } from '../src/server'
import Hapi from '@hapi/hapi'

describe('User plugin', () => {
  let server: Hapi.Server
  const OLD_ENV = process.env;

  beforeAll(async () => {
    server = await createServer()
    setTestFlag(OLD_ENV)

  })

  afterAll(async () => {
    await server.stop()
  })

  test('status endpoint returns 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/',
    })
    expect(res.statusCode).toEqual(200)
    const response = JSON.parse(res.payload)
    expect(response.up).toEqual(true)
  })
})

export function setTestFlag(env:NodeJS.ProcessEnv){
    jest.resetModules();
    process.env = { ...env };
    process.env.TEST = 'true'
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
}
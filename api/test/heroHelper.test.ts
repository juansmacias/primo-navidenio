import { PrismaClient } from '@prisma/client'

import { getAvailableHero } from '../src/helpers/heros-helpers'

import { createHero, destroyAllPromise } from '../src/seed/seedUtils'


export const seedHeros = [
    {
        name:"Wanda",
        photoURL:""
    },{
        name:"Vision",
        photoURL:""
    },{
        name:"Batman",
        photoURL:""
    },{
        name:"Robin",
        photoURL:""
    }
]

describe('test hero helper getAvailableHero', () => {
    const OLD_ENV = process.env;
    const prisma = new PrismaClient()
  
    beforeAll(async () => {
        setTestFlag(OLD_ENV)
        await prisma.$connect()

        seedHeros.forEach(async h=>{await createHero(prisma,h.name,h.photoURL)})
    })
  
    afterAll(async () => {
        await destroyAllPromise(prisma)

        process.env = OLD_ENV
        await prisma.$disconnect()
    })
  
    test('get successful availabe hero', async () => {
        const h = await getAvailableHero(prisma)

        expect(h).toBeTruthy()
    })
  })

  export function setTestFlag(env:NodeJS.ProcessEnv){
    jest.resetModules();
    process.env = { ...env };
    process.env.TEST = 'true'
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
}
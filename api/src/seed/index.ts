import _ from 'lodash'
require('dotenv').config({override:true})
import { PrismaClient } from '@prisma/client'

import {createHero, createTips, destroyAllPromise} from './seedUtils'
import { seedTips, seedHeros } from './seeddata'

const prisma = new PrismaClient()

async function seedHerosFunc(){
    seedHeros.forEach(async (e) =>{
      await createHero(prisma,e.name,e.photoURL,e.description!,e.pareja!)
    })
}

async function seedTipsFunc(){
    seedTips.forEach(async (e) =>{
      await createTips(prisma,e.question)
    })
}

async function main() {
    await destroyAllPromise(prisma,true)
    await seedHerosFunc()
    await seedTipsFunc()
  }
  
  main()
    .catch((e: Error) => {
      console.error(e)
      process.exit(1)
    })
    .finally(async () => {
      // Disconnect Prisma Client
      await prisma.$disconnect()
    })
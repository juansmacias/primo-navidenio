import { PrismaClient, } from '@prisma/client'
import { string } from 'joi'
import { create } from 'lodash'
import {IHero, ITip } from '../models/IModels'

export async function createHero(prisma:PrismaClient,name:string,photoURL:string,description:string,pareja:string){
    return prisma.hero.create({
        data:{
            name,
            photoURL,
            description,
            pareja,
        }
    })
}

export async function createTips(prisma:PrismaClient,question:string){
    return prisma.tip.create({
        data: {
            question
        }
    })
}


export async function destroyAllPromise(prisma:PrismaClient,overrideProcessVal:boolean=false) {
    if(process.env.TEST === 'true'||overrideProcessVal){
  
      const deleteTokens = prisma.token.deleteMany({})
      const deleteAnswers = prisma.answer.deleteMany({})
      const deleteHeros = prisma.hero.deleteMany({})
      const deleteUsers = prisma.user.deleteMany({})
      const deleteTips=prisma.tip.deleteMany({})
  
      return prisma.$transaction([deleteTokens,
        deleteAnswers,
        deleteHeros,
        deleteUsers,
        deleteTips
      ])
    }
  
    return
  }
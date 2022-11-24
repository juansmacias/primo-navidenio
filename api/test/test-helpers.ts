import { add } from 'date-fns'
import { AuthCredentials } from '@hapi/hapi'
import { PrismaClient } from '@prisma/client'
import { TokenType } from '@prisma/client'

export const createTokenForUser = async (
    prisma:PrismaClient,
    userID:number,
): Promise <AuthCredentials> =>{
    const userUpdated = await prisma.user.update({
        where:{
            id:userID
        },
        data:{
            tokens:{
                create:{
                    expiration: add(new Date(), { days: 7 }),
                    type: TokenType.API,
                }
            }
        },
        include:{
            tokens: true
        }
    })

    return {
        user: userUpdated,
      }
}

export const createUserCredentials= async (
    prisma:PrismaClient
): Promise <AuthCredentials> =>{

    const testUser = await prisma.user.create({
        data:{
            email:`user${new Date().getTime()}@amym.co`,
            tokens:{
                create:{
                    expiration: add(new Date(), { days: 7 }),
                    type: TokenType.API,
                }
            }
        },
        include:{
            tokens: true,

        }
    })

    return {
        user: testUser,
      }
}

export function setTestFlag(env:NodeJS.ProcessEnv){
    jest.resetModules();
    process.env = { ...env };
    process.env.TEST = 'true'
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
}
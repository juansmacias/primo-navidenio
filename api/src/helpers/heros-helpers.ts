import { PrismaClient } from '@prisma/client'

export async function getAvailableHero(prisma:PrismaClient){
    const takenHerosIds = await prisma.user.findMany({
        where:{
            heroId:{gt:0}
        },
        select:{
            heroId:true
        }
    })
    console.log("🚀 ~ file: heros-helpers.ts ~ line 12 ~ getAvailableHero ~ takenHerosIds", takenHerosIds)
    const availabeHeros = await prisma.hero.findMany({
        where:{
            NOT: {
                id:{in:takenHerosIds.map(x=>x.heroId!)}
            }
        }
    })

    if(availabeHeros.length===0)
        return 
    
    const numRandom = (Math.floor((Math.random()*100))) % availabeHeros.length
    return availabeHeros[numRandom]

}
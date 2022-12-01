import Joi from 'joi'
import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import { API_AUTH_STATEGY } from './auth'
import { isRequestedUser } from '../helpers/auth-helpers'
import { NotFoundError } from '@prisma/client/runtime'
import { getAvailableHeros } from '../helpers/heros-helpers'

const herosPlugin = {
    name: 'app/heros',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
      // here you can use server.app.prisma
      server.route([{
            method:'GET',
            path:'/heros/available',
            handler:GetAvailableHeros,
            options: {
                auth:{
                    mode:'optional',
                }
            }
        },{
            method:'GET',
            path:'/heros',
            handler:GetHeros,
            options: {
                auth:{
                    mode:'optional',
                }
            }
        },{
            method:'GET',
            path:'/heros/answers',
            handler:GetAnswersFromAssignedHeros,
            options: {
                auth:{
                    mode:'optional'
                }
            }
        }])
    }
}

export default herosPlugin


async function GetAvailableHeros(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app

    try {
        const heros = await getAvailableHeros(prisma)

        return h.response(heros).code(200)
    } catch (e) {
        return Boom.badImplementation("Failed to get available heros"+e)
    }
}

async function GetHeros (request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app
    try {
        const heros = await prisma.hero.findMany({})

        return heros.length>0?h.response(heros).code(200):h.response(heros).code(204)
    } catch (e) {
        return Boom.badImplementation("Failed to get heros"+e)
    }
}

async function GetAnswersFromAssignedHeros(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app

    try {
        const takenHeros = await prisma.user.findMany({
            where:{
                heroId:{gt:0}
            },
            select:{
                answers:true,
                hero:true,
                heroId:true
            }
        })

        return takenHeros.length>0?h.response(takenHeros).code(200):h.response(takenHeros).code(204)
    } catch (e) {
        return Boom.badImplementation("Failed to AnswersFromAssignedHeros"+e)
    }
}
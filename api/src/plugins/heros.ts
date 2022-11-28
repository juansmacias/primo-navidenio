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
import Joi from 'joi'
import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'

const TipsPlugin = {
    name: 'app/tips',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
      // here you can use server.app.prisma
      server.route([
        {
            method: 'GET',
            path: '/tips',
            handler: getTipsHandler,
            options: {
                auth:{
                    mode:'optional',
                }
            },
        }
      ])
    }
}

export default TipsPlugin

async function getTipsHandler(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app

    try {
        const tips = await prisma.tip.findMany({})
        return tips.length === 0 ? h.response([]).code(204): h.response(tips).code(200)
    } catch(e) {
        return Boom.badImplementation('Failed to get tips '+e)
    }
}


import Joi from 'joi'
import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'

const answerInputValidator = Joi.object({
    userid:Joi.number().integer().alter({
        create: schema => schema.required(),
        update: schema => schema.optional()
    }),answersform: Joi.array().items({
        tipId: Joi.number().integer().required(),
        value: Joi.string().required()
    }).alter({
        create: schema => schema.required(),
        update: schema => schema.optional(),
      })
})

const createAnswerValidator = answerInputValidator.tailor('create')
const updateAnswerValidator = answerInputValidator.tailor('update')

const AnswerPlugin = {
    name: 'app/answers',
    dependencies: ['prisma'],
    register: async function(server: Hapi.Server) {
      // here you can use server.app.prisma
      server.route([{
        method: 'GET',
        path: '/answers/{userId}',
        handler: getAnswersByUserId,
        options: {
            auth:{
                mode:'optional',
            },validate:{
                params: Joi.object({
                    userId: Joi.number().integer(),
                })
            }
        },
    },{
        method:'POST',
        path:'/answers',
        handler:createAnswer,
        options: {
            auth:{
                mode:'optional',
            },validate:{
                payload: createAnswerValidator,
                failAction: (request, h, err) => {
                    // show validation errors to user https://github.com/hapijs/hapi/issues/3706
                    throw err
                  },
            }
        },
    },{
        method:'PUT',
        path:'/answers',
        handler:updateAnswer,
        options: {
            auth:{
                mode:'optional',
            },validate:{
                payload: updateAnswerValidator,
                failAction: (request, h, err) => {
                    // show validation errors to user https://github.com/hapijs/hapi/issues/3706
                    throw err
                  },
            }
        },
    }])
    }
}

export default AnswerPlugin

interface IAnswerItem {
    tipId:number,
    value:string
}

interface IAnswerInput {
    userid:number,
    answersform:IAnswerItem[]
}

async function getAnswersByUserId(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app
    const userId = parseInt(request.params.userId,10)

    try {
        const answers = await prisma.answer.findMany({
            where:{ userId:userId }
        })
        return answers.length === 0 ? h.response().code(204): h.response(answers).code(200)
    } catch (e) {
        return Boom.badImplementation('Failed to get answers '+e)
    }
}

async function createAnswer(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app

    const payload = request.payload as IAnswerInput

    try {
        var dataAnswers: any[] = []
        payload.answersform.forEach(a => {
            dataAnswers.push({
                value:a.value,
                tipId:a.tipId,
                userId:payload.userid
            })
        });
        const answers = await prisma.answer.createMany({
            data:dataAnswers
        })
        return h.response(answers).code(200)
    } catch(e) {
        return Boom.badImplementation('Failed creating Answers '+e)
    }
}

async function updateAnswer(request: Hapi.Request, h: Hapi.ResponseToolkit){

}


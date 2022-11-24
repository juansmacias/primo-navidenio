import Joi from 'joi'
import Hapi from '@hapi/hapi'
import Boom from '@hapi/boom'
import { API_AUTH_STATEGY } from './auth'
import { isRequestedUser } from '../helpers/auth-helpers'
import { NotFoundError } from '@prisma/client/runtime'

const userInputValidator = Joi.object({
    email: Joi.string().email().alter({
        create: schema => schema.required(),
        update: schema => schema.optional(),
      }),
  })

const createUserValidator = userInputValidator.tailor('create')
const updateUserValidator = userInputValidator.tailor('update')

// plugin to instantiate Prisma Client
const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function(server: Hapi.Server) {
    // here you can use server.app.prisma
    server.route([{
            method: 'POST',
            path: '/users',
            handler: createUserHandler,
            options: {
                auth:{
                    mode:'optional',
                },
                validate:{
                    payload: createUserValidator,
                    failAction: (request, h, err) => {
                        // show validation errors to user https://github.com/hapijs/hapi/issues/3706
                        throw err
                      },
                },
            },
        },
        {
            method:'GET',
            path:'/users/{userId}',
            handler:getUserHandler,
            options: {
                pre:[isRequestedUser],
                auth:{
                    mode:'required',
                    strategy:API_AUTH_STATEGY
                },
                validate:{
                    params: Joi.object({
                        userId: Joi.number().integer(),
                    })
                }
            }
        },
        {
            method:'PUT',
            path:'/users/{userId}',
            handler: updateUserHandler,
            options: {
                pre:[isRequestedUser],
                auth:{
                    mode:'required',
                    strategy:API_AUTH_STATEGY
                },
                validate:{
                    params: Joi.object({
                        userId: Joi.number().integer(),
                    }),
                    payload: updateUserValidator,
                    failAction: (request, h, err) => {
                        // show validation errors to user https://github.com/hapijs/hapi/issues/3706
                        throw err
                    },
                },
            }
        },
        {
            method:'PUT',
            path:'/users/{userId}/hero',
            handler: assignHeroUserhander,
            options: {
                pre:[isRequestedUser],
                auth:{
                    mode:'required',
                    strategy:API_AUTH_STATEGY
                },
                validate:{
                    params: Joi.object({
                        userId: Joi.number().integer(),
                    })
                },
            }
        }
      ])
    },
}

export default usersPlugin

interface UserInput {
    email: string
}

async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const payload = request.payload as UserInput

    try {
        const createdUser = await prisma.user.create({
            data: {
                email:payload.email
            },
            select: {
                id: true,
            },
        })

        return h.response(createdUser).code(201)
    } catch (err) {
        console.log(err)
        return Boom.badImplementation('Failed to create users');
    }
}

async function getUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app
    const userId = parseInt(request.params.userId,10)

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if(!user)
            return h.response().code(404)
        else 
            return h.response(user).code(200)


    } catch(e) {
        console.log(e)
        return Boom.badImplementation('Failed to get Users');
    }
}

async function updateUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app
    const userId = parseInt(request.params.userId, 10)
    const payload = request.payload as Partial<UserInput>
  
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: payload,
      })

      return h.response(updatedUser).code(200)
    } catch (err) {
      return Boom.badImplementation('failed to update user')
    }
}

async function assignHeroUserhander(request: Hapi.Request, h: Hapi.ResponseToolkit){
    const { prisma } = request.server.app
    const userId = parseInt(request.params.userId,10)

    try{
        const user = await prisma.user.findUnique({
            where: {id:userId}
        })

        if(user?.heroId!=null){
            return Boom.badRequest("ya tiene un heroe asignado")
        }else{
            const availabeHeros = await prisma.hero.findMany({
            })
    
            if(availabeHeros.length>0){
                const updateuser = await prisma.user.update({
                    where:{id:user!.id},
                    data: {
                        hero:{
                            connect:{ id:availabeHeros[0].id} 
                        }
                    }
                })
                return h.response(updateuser).code(200)
            }else{
                return Boom.badRequest("No tenemos mas heroes para assignar. Escribemos a whatsapp para corregir error.")
            }
    
        }

    } catch(e) {
        console.log(e)
        if(e instanceof NotFoundError)
            return Boom.notFound()
        else
            return Boom.badImplementation('Failed to assign hero '+e);
    }
}

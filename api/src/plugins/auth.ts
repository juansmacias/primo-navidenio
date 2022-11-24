import Hapi from '@hapi/hapi'
import Joi from 'joi'
import Boom from '@hapi/boom'
import jwt from 'jsonwebtoken'
import { add } from 'date-fns'
import { TokenType } from '@prisma/client'

// This strategy will be used across the application to secure routes
export const API_AUTH_STATEGY = 'API'

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10

interface LoginInput {
    email:string
}

interface AuthenticateInput {
  email: string
  token: string
}

interface APITokenPayload {
  tokenId: number
}

const authPlugin: Hapi.Plugin<null> = {
  name: 'app/auth',
  dependencies: ['prisma', 'hapi-auth-jwt2', 'app/email'],
  register: async function(server: Hapi.Server) {
  // Define the authentication strategy which uses the `jwt` authentication scheme
  server.auth.strategy(API_AUTH_STATEGY, 'jwt', {
    key: JWT_SECRET,
    verifyOptions: { algorithms: [JWT_ALGORITHM] },
    validate: validateAPIToken,
  })

  // Set the default authentication strategy for API routes, unless explicitly disabled
  server.auth.default(API_AUTH_STATEGY)

    server.route([
        // Endpoint to login or register and to send the short-lived token
        {
          method: 'POST',
          path: '/login',
          handler: loginHandler,
          options: {
            auth: false,
            validate: {
              payload: Joi.object({
                email: Joi.string().email().required()
              }),
            },
          },
        },
        {
          method: 'POST',
          path: '/authenticate',
          handler: authenticateHandler,
          options: {
            auth: false,
            validate: {
              payload: Joi.object({
                email: Joi.string()
                  .required(),
                token:Joi.string()
                  .required()
              }),
            },
          },
        }
      ])
  },
}

export default authPlugin

// Load the JWT secret from environment variables or default
const JWT_SECRET = process.env.JWT_SECRET || 'SUPER_SECRET_JWT_SECRET'

const JWT_ALGORITHM = 'HS256'

const AUTHENTICATION_TOKEN_EXPIRATION_HOURS = 12

const apiTokenSchema = Joi.object({
  tokenId: Joi.number().integer().required(),
})

async function loginHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    // 👇 get prisma and the sendEmailToken from shared application state
    const { prisma, sendEmailToken } = request.server.app
    // 👇 get the email from the request payload
    const { email } = request.payload as LoginInput
    // 👇 generate an alphanumeric token
    const authToken = generateEmailToken()
    // 👇 create a date object for the email token expiration
    const tokenExpiration = add(new Date(), {
      minutes: EMAIL_TOKEN_EXPIRATION_MINUTES,
    })

    try {
        // 👇 create a short lived token and update user or create if they don't exist
        const createdToken = await prisma.token.create({
          data: {
            emailToken: authToken,
            type: TokenType.EMAIL,
            expiration: tokenExpiration,
            user: {
              connectOrCreate: {
                create: {
                    email
                },
                where: {
                  email,
                },
              },
            },
          },
        })
    
        // 👇 send the email token
        if(email!=null)
          await sendEmailToken(email, authToken)

        return h.response().code(200)
      } catch (error:any) {
        return Boom.badImplementation(error.message)
      }
}

async function authenticateHandler(request: Hapi.Request, h: Hapi.ResponseToolkit,) {
  // 👇 get prisma from shared application state
  const { prisma } = request.server.app
  // 👇 get the email and emailToken from the request payload
  const { email, token } = request.payload as AuthenticateInput

  try {
    // Get short lived email token
    const fetchedEmailToken = await prisma.token.findUnique({
      where: {
        emailToken: token,
      },
      include: {
        user: true,
      },
    })

    if (!fetchedEmailToken?.valid) {
      // If the token doesn't exist or is not valid, return 401 unauthorized
      return Boom.unauthorized()
    }

    if (fetchedEmailToken.expiration < new Date()) {
      // If the token has expired, return 401 unauthorized
      return Boom.unauthorized('Token expired')
    }

    // If token matches the user email passed in the payload, generate long lived API token
    if (fetchedEmailToken?.user?.email === email) {
      const tokenExpiration = add(new Date(), {
        hours: AUTHENTICATION_TOKEN_EXPIRATION_HOURS,
      })
      // Persist token in DB so it's stateful
      const createdToken = await prisma.token.create({
        data: {
          type: TokenType.API,
          expiration: tokenExpiration,
          user: {
            connect: {
              email,
            },
          },
        },
      })

      // Invalidate the email token after it's been used
      await prisma.token.update({
        where: {
          id: fetchedEmailToken.id,
        },
        data: {
          valid: false,
        },
      })

      const authToken = generateAuthToken(createdToken.id)
      return h.response(fetchedEmailToken?.user).code(200).header('Authorization', authToken)
    } else {
      return Boom.unauthorized()
    }
  } catch(e:any){
    return Boom.badImplementation(e.message)
  }
}

// Function will be called on every request using the auth strategy
const validateAPIToken = async (
  decoded: APITokenPayload,
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
) => {
  const { prisma } = request.server.app
  const { tokenId } = decoded
  // Validate the token payload adheres to the schema
  const { error } = apiTokenSchema.validate(decoded)

  if (error) {
    request.log(['error', 'auth'], `API token error: ${error.message}`)
    return { isValid: false }
  }

  try{
    // Fetch the token from DB to verify it's valid
    const fetchedToken = await prisma.token.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        user: true,
      },
    })

    // Check if token could be found in database and is valid
    if (!fetchedToken || !fetchedToken?.valid) {
      return { isValid: false, errorMessage: 'Invalid Token' }
    }

    // Check token expiration
    if (fetchedToken.expiration < new Date()) {
      return { isValid: false, errorMessage: 'Token expired' }
    }

    const userWithRelations = await prisma.user.findUnique({
      where:{
        id:fetchedToken.userId
      }
    })

        // The token is valid. Make the `userId`, `isAdmin` to `credentials` which is available in route handlers via `request.auth.credentials`
        return {
          isValid: true,
          credentials: {
            tokenId: decoded.tokenId,
            userId: fetchedToken.userId,
          },
        }

  } catch(e:any){
    request.log(['error', 'auth', 'db'], e)
    return { isValid: false }
  }

}


// Generate a random 8 digit number as the email token
function generateEmailToken(): string {
    return Math.floor(10000000 + Math.random() * 90000000).toString()
  }

// Generate a signed JWT token with the tokenId in the payload
function generateAuthToken(tokenId: number): string {
  const jwtPayload = { tokenId }

  return jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    noTimestamp: true,
    })
}
import Boom from '@hapi/boom'
import Hapi from '@hapi/hapi'

// Pre-function to check if the authenticated user matches the requested user
export async function isRequestedUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    // 👇 userId and isAdmin are populated by the `validateAPIToken` function
    const { userId } = request.auth.credentials
  
    const requestedUserId = parseInt(request.params.userId, 10)
  
    // 👇 Check that the requested userId matches the authenticated userId
    if (requestedUserId === userId) {
      return h.continue
    }
  
    // The authenticated user is not authorized
    throw Boom.forbidden()
}
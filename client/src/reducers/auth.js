import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api as AuthAPI } from 'api/auth'
import * as UserAPI from 'api/users'

const INITIALSTATE = {
  userId: null,
  token: null,
  userEmail:null,
  user:{entities:{}}
}

export const fetchUserById = createAsyncThunk(
  'users/getUser',
  async (userId, { getState, rejectWithValue }) => {
      const { auth:{ token } } = getState()       
    const response = await UserAPI.getUser(token,userId)
    return response.data
  }
)

const slice = createSlice({
  name: 'auth',
  initialState: INITIALSTATE,
  reducers: {
    signOut(state){
      state.userId = null
      state.userEmail = null
      state.token = null
      state.user.entities = {}
    }
  },
  extraReducers:(builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user.entities = action.payload  
    }),builder.addMatcher(
      AuthAPI.endpoints.authenticate.matchFulfilled,
      (state,{payload, meta }) =>{
        const headers = meta.baseQueryMeta.response.headers
        state.userId = payload.id
        state.userEmail = payload.email
        state.token = headers.get('authorization')
      }
    )
  }
})

export const { setCredentials, signOut } = slice.actions

export default slice.reducer

  //----- Selector -----
export const selectCurrentToken = (state) => state.auth?.token

export const selectCurrentAuthUserId = (state) => state.auth?.userId

export const selectCurrentAuth = (state)  => state.auth

  export const selectCurrentUserEntities = (state) => state.auth?.user?.entities
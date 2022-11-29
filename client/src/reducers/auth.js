import { createSlice } from '@reduxjs/toolkit'
import { api } from 'api/auth'

const slice = createSlice({
  name: 'auth',
  initialState: { userId: null, token: null,email:null },
  reducers: {
    signOut(state){
      state.userId = null
      state.email = null
      state.token = null
    }
  },
  extraReducers:(builder) => {
    builder.addMatcher(
      api.endpoints.authenticate.matchFulfilled,
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

export const selectCurrentToken = (state) => state.auth?.token

export const selectCurrentAuthUserId = (state) => state.auth?.userId

export const selectCurrentAuth = (state)  => state.auth
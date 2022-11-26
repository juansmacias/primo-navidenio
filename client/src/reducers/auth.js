import { createSlice } from '@reduxjs/toolkit'
import { api } from 'api/auth'

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {
    signOut(state){
      state.user = null
      state.token = null
    }
  },
  extraReducers:(builder) => {
    builder.addMatcher(
      api.endpoints.authenticate.matchFulfilled,
      (state,{payload, meta }) =>{
        const headers = meta.baseQueryMeta.response.headers
        state.user = payload
        state.token = headers.get('authorization')
      }
    )
  }
})

export const { setCredentials, signOut } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state) => state.auth.user

export const selectCurrentToken = (state) => state.auth.token

export const selectCurrentAuth = (state)  => state.auth
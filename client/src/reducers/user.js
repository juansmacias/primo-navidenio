import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/users'


export const fetchUserById = createAsyncThunk(
    'users/getUser',
    async (userId, { getState, rejectWithValue }) => {
        const { auth:{ token } } = getState()       
      const response = await api.getUser(token,userId)
      return response.data
    }
)

const userSlice  = createSlice({
    name:'users',
    initialState:{entities:{}},
    reducers: { },
    extraReducers: (builder) => {
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state.entities = action.payload  
      })
    },
  })
  
  //----- Selector -----
  export const selectCurrentUserEntities = (state) => state.user.entities
  
  export default userSlice.reducer
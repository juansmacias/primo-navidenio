import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/users'


export const fetchUserById = createAsyncThunk(
    'users/getUser',
    async (userId,thunkAPI, { getState, rejectWithValue }) => {
        const { auth:{ token } } = getState()
        console.log("🚀 ~ file: users.js ~ line 8 ~ userId", userId)
        console.log("🚀 ~ file: users.js ~ line 14 ~ token", token)
        
      const response = await api.getUser(token,userId)
      return response.data
    }
)

const userSlice  = createSlice({
    name:'users',
    initialState:{},
    reducers: { },
    extraReducers: (builder) => {
      builder.addCase(fetchUserById.fulfilled, (state, action) => {
        state = action.payload 
      })
    },
  })
  
  //Selector
  export const selectUser = (state) => state
  
  export default userSlice.reducer
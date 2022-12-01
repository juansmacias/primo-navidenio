import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as heroAPI from 'api/heros'

export const getHeros = createAsyncThunk('heros/getHeros',
    async (thunkapi) => {
        const respose = await heroAPI.getHeros()

        return respose.data
    }
)


const herosSlice = createSlice({
    name:'heros',
    initialState:{entities:[]},
    reducers: { },
    extraReducers: (builder) => {
      builder.addCase(getHeros.fulfilled, (state, action) => {
        state.entities = action.payload
      })
    },
})

export const selectCurrentHeros = (state) => state.heros.entities

export default herosSlice.reducer
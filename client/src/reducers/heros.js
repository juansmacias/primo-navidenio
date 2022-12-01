import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as heroAPI from 'api/heros'

export const getHeros = createAsyncThunk('heros/getHeros',
    async (thunkapi) => {
        const respose = await heroAPI.getHeros()

        return respose.data
    }
)


const tipsSlice = createSlice({
    name:'heros',
    initialState:{entities:[]},
    reducers: { },
    extraReducers: (builder) => {
      builder.addCase(getTips.fulfilled, (state, action) => {
        state.entities = action.payload
      })
    },
})

export const selectCurrentTips = (state) => state.tips.entities

export default tipsSlice.reducer
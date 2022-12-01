import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import * as api from 'api/tips'

export const getTips = createAsyncThunk('tips/getTips',
    async (thunkapi) => {
        const respose = await api.getTips()

        return respose.data
    }
)

const tipsSlice = createSlice({
    name:'tips',
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
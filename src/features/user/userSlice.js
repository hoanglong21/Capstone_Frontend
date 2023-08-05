import { createSlice } from '@reduxjs/toolkit'
import { getUser, updateUser } from './userAction'

const initialState = {
    userInfo: {},
    error: null,
    success: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.error = null
            state.success = null
        },
        logout: () => {
            return initialState
        },
    },
    extraReducers(builder) {
        builder
            // get user
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.userInfo = payload
            })
            // update user
            .addCase(updateUser.pending, (state) => {
                state.error = null
                state.success = null
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.userInfo = payload
                state.error = null
                state.success = true
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.error = payload
                state.success = false
            })
    },
})

export const { reset, logout } = userSlice.actions

export default userSlice.reducer

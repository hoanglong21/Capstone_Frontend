import { createAsyncThunk } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

import UserService from '../../services/UserService'

export const getUser = createAsyncThunk('user/getUser', async (userToken) => {
    const username = jwtDecode(userToken).sub
    const response = await UserService.getUser(username)
    return response.data
})

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userDetails, { rejectWithValue }) => {
        try {
            const response = await UserService.updateUser(
                userDetails.username,
                userDetails
            )
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

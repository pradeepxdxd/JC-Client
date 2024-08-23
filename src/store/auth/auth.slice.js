import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../configs/dev";
import axios from "axios";

export const login = createAsyncThunk('auth/login', async params => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, params);
        return response.data
    }
    catch (err) {
        throw new Error('Something went wrong, please try again later')
    }
})

export const signUp = createAsyncThunk('auth/signUp', async params => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, params);
        return response.data
    }
    catch (err) {
        throw new Error('Something went wrong, please try again later')
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || '',
        toast: '',
        statusCode: 0
    },
    reducers: {
        logout: state => {
            state.token = ''
            localStorage.removeItem('token')
        },
        getToken: state => {
            return state.token ? state.token : localStorage.getItem('token')
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.toast = ''
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.token !== '' || action.payload.token !== undefined || action.payload.token !== null) {
                localStorage.setItem('token', action.payload.token)
                state.token = action.payload.token
                state.statusCode = action.payload.statusCode
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.toast = action.error.message
        })

        builder.addCase(signUp.pending, state => {
            state.toast = ''
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.toast = action.payload.message
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.toast = action.error.message
        })
    }
})

export const { logout, getToken } = authSlice.actions;
export default authSlice.reducer;
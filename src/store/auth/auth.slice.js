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
        loading: false,
        statusCode: ''
    },
    reducers: {
        logout: state => {
            state.token = ''
            localStorage.removeItem('token')
        },
        getToken: state => {
            return state.token ? state.token : localStorage.getItem('token')
        },
        clearToastMessage: state => {
            state.toast = ''
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
                state.toast = action.payload.error
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.toast = action.error.message
        })

        builder.addCase(signUp.pending, state => {
            state.toast = ''
            state.loading = true
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.loading = false
            state.toast = action.payload.message
            state.statusCode = action.payload.statusCode
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.loading = false
            state.toast = action.error.message
            state.statusCode = action.payload.statusCode
        })
    }
})

export const { logout, getToken, clearToastMessage } = authSlice.actions;
export default authSlice.reducer;
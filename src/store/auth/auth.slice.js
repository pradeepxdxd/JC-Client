/* eslint-disable eqeqeq */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../configs/dev";
import axios from "axios";
import {jwtDecode} from 'jwt-decode'

export const login = createAsyncThunk('auth/login', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, params);

        if (response.data.statusCode === 200) {
            return response.data;
        } else {
            return rejectWithValue({ message: response.data.message, statusCode: response.data.statusCode });
        }
    } catch (err) {
        // Check if the error is an Axios error with a response
        if (err.response && err.response.data) {
            // Return the error response data
            return rejectWithValue({ message: err.response.data.message, statusCode: err.response.data.statusCode });
        } else {
            // Return a generic error message
            return rejectWithValue({ message: 'Something went wrong, please try again later', statusCode: 500 });
        }
    }
});


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
            state.statusCode = ''
        }
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.toast = ''
        })
        builder.addCase(login.fulfilled, (state, action) => {
            if (!!action?.payload?.token) {
                const {userId} = jwtDecode(action.payload.token)
                console.log({payload:userId})
                localStorage.setItem('token', action.payload.token)
                localStorage.setItem('uid', userId);
                state.token = action.payload.token
                state.statusCode = action.payload.statusCode
                state.toast = action.payload.message
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            state.toast = action.payload.message
            state.statusCode = action.payload.statusCode
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
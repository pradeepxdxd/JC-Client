/* eslint-disable eqeqeq */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../configs/dev";
import axios from "axios";

// export const login = createAsyncThunk('auth/login', async params => {
//     try {
//         const response = await axios.post(`${BASE_URL}/auth/login`, params);

//         if (response.data.statusCode == 201) {
//             return response.data
//         }

//         else {
//             console.log('/////////////////////')
//             throw new Error(response.data.message)
//         }
//     }
//     catch (err) {
//         console.log({ err })
//         throw new Error('Something went wrong, please try again later')
//     }
// })

export const login = createAsyncThunk('auth/login', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, params);

        if (response.data.statusCode === 201) {
            return response.data;
        } else {
            console.log({response})
            return rejectWithValue({ message: response.data.error, statusCode: response.data.statusCode });
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
            if (!!action.payload.token) {
                localStorage.setItem('token', action.payload.token)
                state.token = action.payload.token
                state.statusCode = action.payload.statusCode
                state.toast = action.payload.error
            }
        })
        builder.addCase(login.rejected, (state, action) => {
            console.log({ action })
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


// console.log({response})
// if (response.data.statusCode == '401') throw new Error(response.data.error)
// if (!!response.data.token) return response.data
// else throw new Error('Username and Password incorrect!')


// else throw new Error({ statusCode: response?.data?.statusCode, message: response.data.message })
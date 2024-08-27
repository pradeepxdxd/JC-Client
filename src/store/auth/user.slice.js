import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from '../../configs/dev'
import { getUserId } from "../../utils/auth";

export const searchUsers = createAsyncThunk('user/searchUsers', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/search?name=${params}&userId=${getUserId()}`);

        if (response.data.statusCode === 200) {
            return response.data;
        } else {
            return rejectWithValue({ message: response.data.error, statusCode: response.data.statusCode });
        }
    }
    catch (err) {
        if (err.response && err.response.data) {
            // Return the error response data
            return rejectWithValue({ message: err.response.data.message, statusCode: err.response.data.statusCode });
        } else {
            // Return a generic error message
            return rejectWithValue({ message: 'Something went wrong, please try again later', statusCode: 500 });
        }
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        loading: false,
    },
    reducers: {
        clearUsers: state => {
            state.users = []
        }
    },
    extraReducers: builder => {
        builder.addCase(searchUsers.pending, state => {
            state.loading = true
            state.users = []
        })
        builder.addCase(searchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload.users
        })
        builder.addCase(searchUsers.rejected, (state) => {
            state.loading = false
        })
    }
})

export const { clearUsers } = userSlice.actions;
export default userSlice.reducer;
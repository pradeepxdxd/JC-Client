import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../configs/dev";

export const getUserInfo = createAsyncThunk('friend/getUserInfo', async ({ userId, friendId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/friend/info?userId=${userId}&friendId=${friendId}`);
        if (response.status === 200 && response.statusText === 'OK') {
            return response.data;
        }
        else {
            return rejectWithValue({ statusCode: response.data.statusCode, message: response.data.message });
        }
    }
    catch (err) {
        if (err.response && err.response.data) {
            return rejectWithValue({ message: err.response.data.message, statusCode: err.response.data.statusCode });
        }
        else {
            return rejectWithValue({ message: 'Something went wrong, please try again later', statusCode: 500 });
        }
    }
});

const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        flag: '',
        info: null,
        loading: false
    },
    reducers: {
        clearState: state => {
            state.flag = ''
            state.info = null
        }
    },
    extraReducers: builder => {
        builder.addCase(getUserInfo.pending, state => {
            state.loading = false
            state.flag = ''
            state.info = null
        })
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.loading = false
            state.flag = action.payload.flag
            state.info = action.payload.data
        })
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loading = false
            state.flag = ''
            state.info = null
        })
    }
})

export const {clearState} = friendSlice.actions;
export default friendSlice.reducer;
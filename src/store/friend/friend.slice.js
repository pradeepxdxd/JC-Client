/* eslint-disable eqeqeq */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../configs/axios/axios'

export const getUserInfo = createAsyncThunk('friend/getUserInfo', async ({ userId, friendId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/friend/info?userId=${userId}&friendId=${friendId}`);
        if (response.status === 200) {
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

export const getFriendList = createAsyncThunk('friend/getFriendList', async (params, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/friend/${params}`);

        if (response.status === 200) {
            return response.data.data
        }
        else {
            return rejectWithValue({ message: response.data.message, statusCode: response.data.statusCode })
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
})

export const sendFriendRequest = createAsyncThunk('friend/sendFriendRequest', async ({ userId, friendId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`/friend/send`, { userId, friendId });
        if (response.status === 201) {
            return response.data;
        }
        else {
            return rejectWithValue({ message: response.data.message, statusCode: response.data.statusCode })
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
})

export const acceptFriendRequest = createAsyncThunk('friend/acceptFriendRequest', async ({ userId, friendId }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`/friend/accept`, { userId, friendId });
        if (response.status === 203) {
            return response.data;
        }
        else {
            return rejectWithValue({ message: response.data.message, statusCode: response.data.statusCode })
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
})

const friendSlice = createSlice({
    name: 'friend',
    initialState: {
        flag: '',
        info: null,
        loading: false,
        friendList: [],
        message: '',
    },
    reducers: {
        clearState: state => {
            state.flag = ''
            state.info = null
        },
        updateFriendList: (state, action) => {
            const { id, message, time } = action.payload;
            state.friendList = state.friendList.map(list => {
                if (list?._id == id) {
                    return {
                        ...list,
                        lastMessage: message,
                        lastTime: time
                    }
                }
                return list;
            })
        },
        updateSeen: (state, action) => {
            state.friendList = state.friendList.map(list => {
                if (list?._id === action.payload) {
                    return {
                        ...list,
                        receiverStatus: 'READ'
                    }
                }
                return list;
            })
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

        builder.addCase(getFriendList.pending, state => {
            state.loading = false
            state.friendList = []
        })
        builder.addCase(getFriendList.fulfilled, (state, action) => {
            state.loading = false
            state.friendList = action.payload
        })
        builder.addCase(getFriendList.rejected, (state, action) => {
            state.loading = false
        })

        builder.addCase(sendFriendRequest.pending, state => {
            state.loading = false
        })
        builder.addCase(sendFriendRequest.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.flag = action.payload.flag
            state.info = { ...state.info, accept: action.payload.accept }
        })
        builder.addCase(sendFriendRequest.rejected, (state, action) => {
            state.loading = false
            state.message = action.error.message
        })

        builder.addCase(acceptFriendRequest.pending, state => {
            state.loading = false
        })
        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.info = { ...state.info, accept: action.payload.accept }
            state.friendList = [...state.friendList, action.payload.user[0]]
        })
        builder.addCase(acceptFriendRequest.rejected, (state, action) => {
            state.loading = false
            state.message = action.error.message
        })
    }
})

export const { clearState, updateFriendList, updateSeen } = friendSlice.actions;
export default friendSlice.reducer;
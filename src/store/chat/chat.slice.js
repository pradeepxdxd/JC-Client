import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../configs/dev'

export const sendMessage = createAsyncThunk('chat/sendMessage', async (params, { rejectWithValue }) => {
    const { senderId, receiverId, time, message } = params;
    try {
        const response = await axios.post(`${BASE_URL}/chat/send?senderId=${senderId}&receiverId=${receiverId}`, { message, time });

        if (response.status === 201) {
            return response.data;
        }
        else {
            return rejectWithValue({ message: response.data.message, statusCode: response.status })
        }
    }
    catch (err) {
        if (err.response && err.response.data) {
            return rejectWithValue({ message: err.response.data.message, statusCode: err.response.data.statusCode });
        } else {
            return rejectWithValue({ message: 'Something went wrong, please try again later', statusCode: 500 });
        }
    }
})

export const getMessages = createAsyncThunk('chat/getMessages', async (params, { rejectWithValue }) => {
    try {
        const { senderId, receiverId } = params;
        const response = await axios.get(`${BASE_URL}/chat/messages?senderId=${senderId}&receiverId=${receiverId}`);

        if (response.status === 200) {
            return response.data;
        }
        else {
            return rejectWithValue({ message: response.data.message, statusCode: response.status })
        }
    }
    catch (err) {
        if (err.response && err.response.data) {
            return rejectWithValue({ message: err.response.data.message, statusCode: err.response.status });
        } else {
            return rejectWithValue({ message: 'Something went wrong, please try again later', statusCode: 500 });
        }
    }
})

export const updateReadStataus = createAsyncThunk('chat/updateReadStataus', async (params, { rejectWithValue }) => {
    try {
        if (!!params) {
            const response = await axios.patch(`${BASE_URL}/chat/update/read-status/${params}`);

            if (response.status === 200) {
                return params._id;
            }
            else {
                return rejectWithValue({ message: response.data.message, statusCode: response.status })
            }
        }
    }
    catch (err) {
        if (err.response && err.response.data) {
            return rejectWithValue({ message: err.response.data.message, statusCode: err.response.status });
        } else {
            return rejectWithValue({ message: 'Something went wrong, please try again later', statusCode: 500 });
        }
    }
})

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        loading: false
    },
    reducers: {
        clearChats: state => {
            state.chats = []
        },
        setChat: (state, action) => {
            if (!Array.isArray(state.chats)) {
                state.chats = [action.payload]
            }
            else {
                state.chats = [...state.chats, action.payload]
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(getMessages.pending, state => {
            state.loading = true;
            state.chats = [];
        });
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.chats = action.payload.data;
        })
        builder.addCase(getMessages.rejected, (state, action) => {
            if (action.payload.statusCode === 404) {
                state.chats = []
            }
            state.loading = false;
            state.chats = action.error.message;
        })
    }
})

export const { clearChats, setChat } = chatSlice.actions;
export default chatSlice.reducer; 
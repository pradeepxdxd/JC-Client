import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        messages : []
    },
    reducers: {
        setMessages: (state, action) => {
            // eslint-disable-next-line no-unused-expressions
            state.messages.push(action.payload)
        },
        getMessages : state => {
            return state.messages;
        },
        clearMessages : state => {
            state.messages = []
        }
    }
})

export const { setMessages, getMessages, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
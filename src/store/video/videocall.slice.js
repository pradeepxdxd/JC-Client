import { createSlice } from "@reduxjs/toolkit";

const videoCallSlice = createSlice({
    name: 'videocall',
    initialState: {
        roomId: '',
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        clearRoomId: state => {
            state.roomId = ''
        }
    }
})

export default videoCallSlice.reducer
export const { setRoomId, clearRoomId } = videoCallSlice.actions
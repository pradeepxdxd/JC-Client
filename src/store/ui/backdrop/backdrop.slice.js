import { createSlice } from "@reduxjs/toolkit";

const backdropSlice = createSlice({
    name: 'backdrop',
    initialState: {
        backdrop: false,
    },
    reducers: {
        handleBackDropOpen: (state) => {
            state.backdrop = true
        },
        handleBackDropClose: (state) => {
            state.backdrop = false
        },
    }
})

export const { handleBackDropClose, handleBackDropOpen } = backdropSlice.actions
export default backdropSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        name: '',
        image: ''
    },
    reducers: {
        setProfile: (state, action) => {
            // eslint-disable-next-line no-unused-expressions
            state.name = action.payload.name
            state.image = action.payload.image
        },
        resetProfile: (state, action) => {
            // eslint-disable-next-line no-unused-expressions
            state.name = ''
            state.image = ''
        },
    }
})

export const { setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
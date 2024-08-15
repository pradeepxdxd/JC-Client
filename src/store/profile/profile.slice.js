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
    }
})

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
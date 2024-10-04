import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        name: '',
        image: '',
        logger : 0
    },
    reducers: {
        setProfile: (state, action) => {
            // eslint-disable-next-line no-unused-expressions
            state.name = action.payload.name
            state.image = action.payload.image
        },
        resetProfile: (state) => {
            // eslint-disable-next-line no-unused-expressions
            state.name = ''
            state.image = ''
        },
        setLogger: (state, {payload}) => {
            state.logger = payload;
        },
        clearLogger: state => {
            state.logger = 0;
        }
    }
})

export const { setProfile, resetProfile, clearLogger, setLogger } = profileSlice.actions;
export default profileSlice.reducer;
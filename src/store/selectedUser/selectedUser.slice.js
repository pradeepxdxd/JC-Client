import { createSlice } from "@reduxjs/toolkit";

const selectedUser = createSlice({
    name: 'selectedUser',
    initialState: {
        selected: false
    },
    reducers: {
        userSelected: (state) => {
            state.selected = true
        },
        userUnselected: (state) => {
            state.selected = false
        },
        getSelected : state => {
            return state.selected;
        }
    }
})

export const { userSelected, userUnselected, getSelected } = selectedUser.actions
export default selectedUser.reducer;
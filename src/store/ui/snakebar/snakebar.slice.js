import { createSlice } from "@reduxjs/toolkit";

const SnakebarSlice = createSlice({
    name : 'SnakebarSlice',
    initialState : {
        snakebarOpen : false,
        message : ''
    },
    reducers : {
        handleSnackbarClick : (state) => {
            state.message = 'Working on it...'
            state.snakebarOpen = true
        },      
        handleSnackbarClose : (state) => {
            state.message = ''
            state.snakebarOpen = false
        },      
    }
})

export const {handleSnackbarClick,handleSnackbarClose} = SnakebarSlice.actions
export default SnakebarSlice.reducer
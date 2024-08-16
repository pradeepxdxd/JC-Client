import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profile.slice";
import messageSlice from "./message/message.slice";
import snakebarSlice from "./ui/snakebar/snakebar.slice";
import selectedUserSlice from './selectedUser/selectedUser.slice'

const store = configureStore({
    reducer: {
        profileSlice,
        messageSlice,
        snakebarSlice,
        selectedUserSlice,
    }
})

export default store;
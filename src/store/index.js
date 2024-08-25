import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profile.slice";
import messageSlice from "./message/message.slice";
import snakebarSlice from "./ui/snakebar/snakebar.slice";
import selectedUserSlice from './selectedUser/selectedUser.slice'
import authSlice from "./auth/auth.slice";
import backdropSlice from "./ui/backdrop/backdrop.slice";
import userSlice from "./auth/user.slice";

const store = configureStore({
    reducer: {
        profileSlice,
        messageSlice,
        snakebarSlice,
        selectedUserSlice,
        auth: authSlice,
        backdrop: backdropSlice,
        user: userSlice
    }
})

export default store;
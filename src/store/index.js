import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profile.slice";
import messageSlice from "./message/message.slice";
import snakebarSlice from "./ui/snakebar/snakebar.slice";

const store = configureStore({
    reducer: {
        profileSlice,
        messageSlice,
        snakebarSlice,
    }
})

export default store;
import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profile.slice";
import messageSlice from "./message/message.slice";

const store = configureStore({
    reducer: {
        profileSlice,
        messageSlice,
    }
})

export default store;
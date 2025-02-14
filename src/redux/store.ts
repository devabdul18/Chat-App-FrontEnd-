import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import profileReducer from "./slice/ProfileSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

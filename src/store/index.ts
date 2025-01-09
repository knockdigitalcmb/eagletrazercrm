import { configureStore } from "@reduxjs/toolkit";
import commonSliceReducer from "../features/common/commonSlice";

export const store = configureStore({
    reducer: {
        commonData: commonSliceReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
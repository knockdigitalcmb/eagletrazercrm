import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {},
    devTools: process.env.NODE_ENV !== 'production'
})

export const CRMAppDispatch = typeof store.dispatch;
export const CRMRootState = store.getState;
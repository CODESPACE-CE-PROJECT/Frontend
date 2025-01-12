import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import navbarSlice  from "./slices/navbarSlice";

export const store = configureStore({
    reducer: {navbarSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
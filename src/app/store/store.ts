import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import navbarSlice from "./slices/navbarSlice";
import courseNavSlice from "./slices/courseNavSlice";

export const store = configureStore({
  reducer: {
    navbarSlice,
    courseNavSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NavbarState {
     isCloseNav: boolean;
}

const initialState: NavbarState = {
     isCloseNav: false
}

export const navbarSlice = createSlice({
     name: "navbar",
     initialState,
     reducers: {
         setIsCloseNavbar: (state,  action: PayloadAction<boolean>) => {
               state.isCloseNav = action.payload;
         },
     }
});

export default navbarSlice.reducer; 
export const navbarSelector = (state:RootState) => state.navbarSlice;
export const {setIsCloseNavbar} = navbarSlice.actions
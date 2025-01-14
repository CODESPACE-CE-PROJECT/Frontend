import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface courseNavState {
     isCloseCourseNav: boolean;
}

const initialState: courseNavState = {
     isCloseCourseNav: false
}

export const courseNavSlice = createSlice({
     name: "courseNav",
     initialState,
     reducers: {
         setIsCloseCourseNav: (state,  action: PayloadAction<boolean>) => {
               state.isCloseCourseNav = action.payload;
         },
     }
});

export default courseNavSlice.reducer; 
export const courseNavSelector = (state:RootState) => state.courseNavSlice;
export const {setIsCloseCourseNav} = courseNavSlice.actions
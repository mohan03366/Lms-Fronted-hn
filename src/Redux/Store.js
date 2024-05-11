import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/courseSlice";

const Store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
  },
  devTools: true,
});

export default Store;

import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/courseSlice";
import razorpaySliceReducer from "./Slices/RazorpaySlice";

const Store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: razorpaySliceReducer,
  },
  devTools: true,
});

export default Store;

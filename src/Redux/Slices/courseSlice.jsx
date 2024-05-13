import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  console.log("hello");
  try {
    const response = axios.get("http://localhost:5006/api/v1/courses", {
      credentials: true,
    });
    toast.promise(response, {
      loading: "loading course data....",
      success: "courses loaded successfully",
      error: "failed to get the courses",
    });
    return (await response).data.courses;
  } catch (error) {
    toast.error(erreo?.response?.data?.message);
  }
});

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        // console.log(action.payload);
        state.courseData = [...action.payload];
      }
    });
  },
});

export default courseSlice.reducer;

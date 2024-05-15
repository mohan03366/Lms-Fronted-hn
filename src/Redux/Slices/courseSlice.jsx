import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
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

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("tittle", data?.tittle);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnails", data?.thumbnails);

      const response = axios.post(
        "http://localhost:5006/api/v1/courses/",
        formData,
        {
          credentials: true,
        }
      );
      console.log(response);
      toast.promise(response, {
        loading: "creating new course",
        success: "Course created successfully",
        error: "failed to create course",
      });
      return (await response).data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  }
);

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

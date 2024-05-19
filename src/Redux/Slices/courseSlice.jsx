import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  courseData: [],
};

// export const getAllCourses = createAsyncThunk("/course/get", async () => {
//   try {
//     const response = axios.get("http://localhost:5007/api/v1/courses", {
//       withCredentials: true,
//     });

//     toast.promise(response, {
//       loading: "Loading course data...",
//       success: "Courses loaded successfully",
//       error: "Failed to get the courses",
//     });
//     console.log(response.data.courses);
//     return await response.data.courses;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axios.get("http://localhost:5007/api/v1/courses/");
    toast.promise(response, {
      loading: "loading course data...",
      success: "Courses loaded successfully",
      error: "Failed to get the courses",
    });
    //console.log((await response).data.courses);
    return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnails", data?.thumbnails);

      const response = axios.post(
        "http://localhost:5007/api/v1/courses/",
        formData,
        {
          withCredentials: true,
        }
      );
      toast.promise(response, {
        loading: "Creating new course...",
        success: "Course created successfully",
        error: "Failed to create course",
      });
      return response.data;
    } catch (error) {
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
        state.courseData = action.payload;
      }
    });
  },
});

export default courseSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import axiosInstance from "../../Helpers/AxiosInstance";
import axios from "axios";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: (() => {
    try {
      const data = localStorage.getItem("data");
      console.log("MY DATA ", data);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {};
    }
  })(),
};
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axios.post(
      "http://localhost:5007/api/v1/user/register/",
      data,
      {
        withCredentials: true,
      }
    );

    toast.promise(res, {
      loading: "wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to create account",
    });

    return await res;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:5007/api/v1/user/login/",
      data,
      {
        withCredentials: true,
      }
    );
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to log in");
    throw error;
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axios.get("http://localhost:5007/api/v1/user/logout/", {
      withCredentials: true,
    });
    //console.log(data);
    toast.promise(res, {
      loading: "wait! logout in progress",
      success: (data) => {
        //console.log(data?.data?.message);
        return data?.data?.message;
      },
      error: "failed to logout",
    });
    return await res;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

// export const UpdateProfile = createAsyncThunk(
//   "/user/update/profile",
//   async (data) => {
//     // console.log("our data is", data);
//     try {
//       const res = axios.put(
//         `http://localhost:5007/api/v1/user/update/${data[0]}`,
//         data[1],
//         {
//           withCredentials: true,
//         }
//       );
//       // console.log("ur data", data);
//       toast.promise(res, {
//         loading: "wait! update in progress.....",
//         success: (data) => {
//           //console.log(data?.data?.message);
//           return data?.data?.message;
//         },
//         error: "failed to update userProfile",
//       });
//       return (await res).data;
//     } catch (error) {
//       console.log("my error", error);
//       toast.error(error?.response?.data?.message);
//     }
//   }
// );

// export const getUserData = createAsyncThunk("/user/details/", async () => {
//   try {
//     const res = axios.get("http://localhost:5007/api/v1/user/me", {
//       withCredentials: true,
//     });
//     //console.log(data);
//     toast.promise(res, {
//       loading: "wait! getting User details",
//       success: (data) => {
//         console.log(data?.data?.message);
//         return data?.data?.message;
//       },
//       error: "failed to getuserdata",
//     });
//     return await res;
//   } catch (error) {
//     console.log(error);
//     toast.error(error?.response?.data?.message);
//   }
// });

export const UpdateProfile = createAsyncThunk(
  "/user/update/profile",
  async ([userId, formData]) => {
    try {
      const res = axios.put(
        `http://localhost:5007/api/v1/user/update/${userId}`,
        formData,
        {
          withCredentials: true,
        }
      );
      toast.promise(res, {
        loading: "wait! update in progress.....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to update userProfile",
      });
      return res.data;
    } catch (error) {
      console.log("my error", error);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const getUserData = createAsyncThunk("/user/details/", async () => {
  try {
    const res = axios.get("http://localhost:5007/api/v1/user/me", {
      withCredentials: true,
    });
    toast.promise(res, {
      loading: "wait! getting User details",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to getuserdata",
    });
    return await res;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        // Handle the update profile success case
        state.data = action.payload.user;
        localStorage.setItem("data", JSON.stringify(action.payload.user));
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});
// export const {} = authSlice.actions;
export default authSlice.reducer;

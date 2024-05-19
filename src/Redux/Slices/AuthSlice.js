import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/AxiosInstance";
import axios from "axios";
import toast from "react-hot-toast";
import { json } from "react-router-dom";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
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
    console.log(data);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        //console.log("Hello from Response");
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
      });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;

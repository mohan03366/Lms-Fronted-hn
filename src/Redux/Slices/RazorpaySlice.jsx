import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  key: "",
  subscriptionId: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

export const razorpayId = createAsyncThunk("/razorpay/getId", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5007/api/v1/payments/razorpay-key",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    toast.error("failed to load data");
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "/purchaseCourse",
  async () => {
    try {
      const response = await axios.post(
        "http://localhost:5007/api/v1/payments/subscribe",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5007/api/v1/payments/verify",
        {
          withCredentials: true,
          razorpayPaymentId: data.razorpayPaymentId,
          razorpaySubscriptionId: data.razorpaySubscriptionId,
          razorpaySignature: data.razorpaySignature,
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payments/record",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5007/api/v1/payments?count=100",
        {
          withCredentials: true,
        }
      );
      toast.promise(response, {
        loading: "getting the payment records",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to get payments records",
      });
      return (await response).data;
    } catch (error) {
      toast.error("operation failed");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payments/cancel",
  async () => {
    try {
      const response = await axios.post(
        "http://localhost:5007/api/v1/payments/unsubscriibe",
        {
          withCredentials: true,
        }
      );
      toast.promise(response, {
        loading: "unsubscribing the bundle",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to unsubscribe",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(razorpayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscriptionId = action?.payload?.subscriptionId;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.success);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

export default razorpaySlice.reducer;

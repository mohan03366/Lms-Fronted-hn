import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

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

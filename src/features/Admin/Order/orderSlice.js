import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const orderListing = createAsyncThunk(
  "admin/order/list",
  async (_, thunkAPI) => {
    // Here you can make a request to your API to invalidate the token if necessary
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/admin/order/list",
        method: "POST",
        headers: headersList,
       
      };

      let response = await axios.request(reqOptions);

      const data = response;

      console.log("order list fetched successfully", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const orderDetails = createAsyncThunk(
  "admin/order/order-details",
  async (subOrderId, thunkAPI) => {
    // Here you can make a request to your API to invalidate the token if necessary
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/admin/order/detail",
        method: "POST",
        headers: headersList,
        data: { subOrderId: subOrderId },
       
      };

      let response = await axios.request(reqOptions);

      const data = response;

      console.log("order-details fetched successfully", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const customerDelete = createAsyncThunk(
  "admin/customer/delete",
  async (customerId, thunkAPI) => {
    // Here you can make a request to your API to invalidate the token if necessary
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/admin/customer/delete",
        method: "DELETE",
        headers: headersList,
        data: { customerId: customerId },
      };

      let response = await axios.request(reqOptions);

      const data = response;

      console.log("customer with details deleted successfully", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const customerUpdate = createAsyncThunk(
  "admin/customer/edit",
  async (customerData, thunkAPI) => {
    // Here you can make a request to your API to invalidate the token if necessary
    try {
      let headersList = {
        Authorization: localStorage.getItem("admin-token"),
      };
      let reqOptions = {
        url: "http://3.6.127.143/api/admin/customer/edit",
        method: "PATCH",
        headers: headersList,
        data: customerData,
      };

      let response = await axios.request(reqOptions);

      const data = response;

      console.log("customer with details updated successfully", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  
  initialState: {
    orderList: [],
    orderListStatus: "idle",
    isLoading: false,
    
    customerInfo:{},
    productInfo:{},
    orderInfo:{},
    orderDetailsStatus: "idle",
    orderDetailsLoading:false,
    orderDetailsSuccess: false,

  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderListing.pending, (state) => {
        state.isLoading = true;
        state.orderListStatus = "loading";
      })
      .addCase(orderListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderListStatus = "succeeded";
        state.orderList = action.payload;
      })
      .addCase(orderListing.rejected, (state, action) => {
        state.isLoading = false;
        state.orderListStatus = "failed";

      })

      .addCase(orderDetails.pending, (state) => {
        state.orderDetailsLoading = true;
        state.orderDetailsStatus = "loading";
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetailsStatus = "succeeded";
        state.productInfo = action.payload.data.productInfo;
        state.orderInfo = action.payload.data.orderInfo;
        state.customerInfo = action.payload.data.customerInfo;

      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.orderDetailsLoading = false;
        state.orderDetailsStatus = "failed";

      })

    //     state.customerDeleteLoading = true;
    //     state.cutomerDeleteStatus = "loading";
    //   })
    //   .addCase(customerDelete.fulfilled, (state, action) => {
    //     state.customerDeleteLoading = false;
    //     state.customerDeleteSuccess = action.payload.success;
    //     state.cutomerDeleteStatus = "succeeded";
    //   })
    //   .addCase(customerDelete.rejected, (state, action) => {
    //     state.cutomerDeleteStatus = "failed";
    //     state.customerDeleteLoading = false;
    //     state.customerDeleteSuccess = action.payload.success;
    //   })
      
    //   .addCase(customerUpdate.pending, (state) => {
    //     state.customerEditLoading = true;
    //     state.customerEditStatus = "loading";
    //   })
    //   .addCase(customerUpdate.fulfilled, (state, action) => {
    //     state.customerEditLoading= false;
    //     state.customerEditSuccess = action.payload.success;
    //     state.customerEditStatus = "succeeded";
    //   })
    //   .addCase(customerUpdate.rejected, (state, action) => {
    //     state.customerEditLoading= false;
    //     state.customerEditSuccess = action.payload.success;
    //     state.customerEditStatus = "failed";
    //   });
      
  },
});

export default orderSlice.reducer;

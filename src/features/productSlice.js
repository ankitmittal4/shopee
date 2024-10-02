// features/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoints
// const AUTH_URL = "your-auth-url";
// const PRODUCTLIST_URL = "http://3.6.127.143/api/customer/product/list";

// Async thunk for fetching product list
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (pageDetails, thunkAPI) => {
    try {
      let reqOptions = {
        url: "http://3.6.127.143/api/guest/productList",
        method: "POST",
        // headers: headersList,
        data: pageDetails,
      };

      let response = await axios.request(reqOptions);
      // console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProducts",
  async (id, thunkAPI) => {
    try {
      console.log("productId: ", id);
      let reqOptions = {
        url: "http://3.6.127.143/api/guest/productDetail",
        method: "POST",
        // headers: headersList,
        data: { productId: id },
      };

      let response = await axios.request(reqOptions);
      console.log("details", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

const productDetailSlice = createSlice({
  name: "productDetails",
  initialState: {
    detail: null, // Use singular since it's one product's details
    detailStatus: "idle",
    detailError: null, // Capture errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.detailStatus = "loading";
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.detail = action.payload; // Store product details from action.payload
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.detailStatus = "failed";
        state.detailError = action.payload; // Capture the error from the rejected case
      });
  },
});

export const productReducer = productSlice.reducer;

export const productDetailReducer = productDetailSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addItem = createAsyncThunk(
  "products/addItem",
  async (cartData, thunkAPI) => {
    try {
      let headers = {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      };

      let reqOptions = {
        url: "http://3.6.127.143/api/cart/addProduct",
        method: "POST",
        headers: headers,
        data: cartData,
      };

      let response = await axios.request(reqOptions);

      console.log(response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const updateItemQuantity = createAsyncThunk(
  "products/updateItem",
  async (updatedData, thunkAPI) => {
    try {
      let headers = {
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      };

      let reqOptions = {
        url: "http://3.6.127.143/api/cart/updateProductQuantity",
        method: "POST",
        headers: headers,
        data: updatedData,
      };

      let response = await axios.request(reqOptions);

      console.log("quantity is updated", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getcartItemList = createAsyncThunk(
  "products/cartitems",
  async (thunkAPI) => {
    try {
      let headers = {
        Authorization: localStorage.getItem("auth-token"),
      };

      let reqOptions = {
        url: "http://3.6.127.143/api/cart/detail",
        method: "POST",
        headers: headers,
        // data: {
        //   page: 1,
        //   limit: 10,
        // },
      };

      let response = await axios.request(reqOptions);

      console.log("cart items list", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addItemSlice = createSlice({
  name: "addcartItem",
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
    statusbar: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

const updateitemSlice = createSlice({
  name: "updateCartItem",
  initialState: {
    updatedData: [],
    isLoading: false,
    error: null,
    quantityStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateItemQuantity.pending, (state) => {
        state.quantityStatus = "loading";
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        state.quantityStatus = "succeeded";
        state.updatedData = action.payload;
      })
      .addCase(updateItemQuantity.rejected, (state, action) => {
        state.quantityStatus = "failed";
        state.error = action.payload;
      });
  },
});

const cartItemlistSlice = createSlice({
  name: "cartItemlist",
  initialState: {
    cartProducts: [],
    cartLaoding: false,
    error: null,
    cartStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcartItemList.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(getcartItemList.fulfilled, (state, action) => {
        state.cartStatus = "succeeded";
        state.cartProducts = action.payload;
      })
      .addCase(getcartItemList.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const addItemReducer = addItemSlice.reducer;
export const cartItemsReducer = cartItemlistSlice.reducer;
export const updateItemsReducer = updateitemSlice.reducer;

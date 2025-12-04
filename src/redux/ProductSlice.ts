import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id: string) => {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  }
);

interface ProductState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  data: null,
  loading: false,
  error: null
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load product";
      });
  }
});

export default productSlice.reducer;

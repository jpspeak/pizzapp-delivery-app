import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productAPI } from "../../api/productAPI";
import { RootState } from "../../store";

export interface ProductType {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
  };
}

export interface ProductInitialState {
  product?: ProductType;
  loading: boolean;
  error?: string;
}

const initialState: ProductInitialState = { loading: false };

export const fetchProduct = createAsyncThunk("product/fetchOneStatus", async (productId: number) => {
  const response = await productAPI.getOne(productId);
  return response.data.data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
export const selectProduct = (state: RootState) => state.product;
export default productSlice.reducer;

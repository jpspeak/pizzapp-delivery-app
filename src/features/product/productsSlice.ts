import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productAPI } from "../../api/productAPI";
import { RootState } from "../../store";

export interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
  };
}

export interface ProductsInitialState {
  products: Product[];
  loading: boolean;
  error?: string;
}

const initialState: ProductsInitialState = { products: [], loading: false };

export const fetchProducts = createAsyncThunk("products/fetchAllStatus", async () => {
  const response = await productAPI.getAll();
  return response.data.data;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});
export const selectProducts = (state: RootState) => state.products;
export default productsSlice.reducer;

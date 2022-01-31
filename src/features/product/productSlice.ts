import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { StateType } from "../../common/types";
import { db } from "../../config/firebase";
import { RootState } from "../../store";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  prices: {
    regular: number;
    large: number;
    extraLarge: number;
  };
  image: string;
}

export interface ProductInitialState {
  product?: ProductType;
  fetchState: StateType;
}

const initialState: ProductInitialState = { fetchState: "READY" };

export const productFetch = createAsyncThunk("product/fetchStatus", async (productId: string) => {
  const productDocRef = doc(db, "products", productId);
  const productSnapshot = await getDoc(productDocRef);
  const product = productSnapshot.exists() && productSnapshot.data();
  return { id: productSnapshot.id, ...product } as ProductType;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //Get products
    builder.addCase(productFetch.pending, state => {
      state.fetchState = "LOADING";
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.fetchState = "READY";
      state.product = action.payload;
    });
    builder.addCase(productFetch.rejected, (state, action) => {
      state.fetchState = "ERROR";
      console.log(action.error);
    });
  }
});
export const selectProduct = (state: RootState) => state.product.product;
export const selectProductFetchState = (state: RootState) => state.product.fetchState;
export default productSlice.reducer;

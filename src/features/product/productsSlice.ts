import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { StateType } from "../../common/types";
import { db } from "../../config/firebase";
import { RootState } from "../../store";
import { ProductType } from "./productSlice";

export interface ProductsState {
  products: ProductType[];
  productsFetchState: StateType;
  productsBestSellers: ProductType[];
  productsBestSellersFetchState: StateType;
}

const initialState: ProductsState = { products: [], productsFetchState: "READY", productsBestSellers: [], productsBestSellersFetchState: "READY" };

export const productsFetch = createAsyncThunk("products/fetchStatus", async () => {
  const productsColRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsColRef);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProductType[];
  return productsList;
});

export const productsFetchBestSeller = createAsyncThunk("products/fetchBestSellersStatus", async () => {
  const productsColRef = collection(db, "products");
  const productsBestSellerQuery = query(productsColRef, orderBy("orderCount"));
  const productsSnapshot = await getDocs(productsBestSellerQuery);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ProductType[];
  return productsList;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //Fetch all products
    builder.addCase(productsFetch.pending, state => {
      state.productsFetchState = "LOADING";
    });
    builder.addCase(productsFetch.fulfilled, (state, action) => {
      state.productsFetchState = "READY";
      state.products = action.payload;
    });
    builder.addCase(productsFetch.rejected, (state, action) => {
      state.productsBestSellersFetchState = "ERROR";
      console.log(action.error);
    });
    //Fetch best seller products
    builder.addCase(productsFetchBestSeller.pending, state => {
      state.productsBestSellersFetchState = "LOADING";
    });
    builder.addCase(productsFetchBestSeller.fulfilled, (state, action) => {
      state.productsBestSellersFetchState = "READY";
      state.productsBestSellers = action.payload;
    });
    builder.addCase(productsFetchBestSeller.rejected, (state, action) => {
      state.productsBestSellersFetchState = "ERROR";
      console.log(action.error);
    });
  }
});

export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsFetchState = (state: RootState) => state.products.productsFetchState;
export const selectProductsBestSellers = (state: RootState) => state.products.productsBestSellers;
export const selectProductsBestSellersFetchState = (state: RootState) => state.products.productsBestSellersFetchState;

export default productsSlice.reducer;

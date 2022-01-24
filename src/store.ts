import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./features/product/productsSlice";
import product from "./features/product/productSlice";
import bag from "./features/bag/bagSlice";

const rootReducer = combineReducers({
  products,
  product,
  bag
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

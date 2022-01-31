import { combineReducers, configureStore } from "@reduxjs/toolkit";
import products from "./features/product/productsSlice";
import product from "./features/product/productSlice";
import bag from "./features/bag/bagSlice";
import auth from "./features/auth/authSlice";
import orders from "./features/order-history/ordersSlice";
import adminOrders from "./features/admin/order/ordersSlice";
import adminProducts from "./features/admin/product/productsSlice";
import productFormModal from "./features/admin/product/productFormModalSlice";

const rootReducer = combineReducers({
  auth,
  products,
  product,
  bag,
  orders,
  admin: combineReducers({
    orders: adminOrders,
    products: adminProducts,
    productFormModal
  })
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

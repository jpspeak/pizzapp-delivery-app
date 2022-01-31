import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

export type ProductStatusType = "available" | "not available";

export interface ProductType {
  id: string;
  name: string;
  description?: string;
  prices: { regular: number; large: number; extraLarge: number };
  status: ProductStatusType;
  image: string;
}

const initialState: ProductType[] = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (_, action: PayloadAction<ProductType[]>) => {
      return action.payload;
    }
  }
});

export const selectProducts = (state: RootState) => state.admin.products;

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;

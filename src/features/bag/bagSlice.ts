import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SizesType } from "../../components/RadioPizzaSize/Index";
import { ProductType } from "../product/productSlice";

interface BagItem {
  product: ProductType;
  quantity: number;
  size: SizesType;
}

const initialState: BagItem[] = [];

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<BagItem>) => {
      state.push(action.payload);
    }
  }
});

export const { add } = bagSlice.actions;

export default bagSlice.reducer;

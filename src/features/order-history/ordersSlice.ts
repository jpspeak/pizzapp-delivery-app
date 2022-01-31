import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaSizesType } from "../../components/RadioPizzaSize/Index";
import { RootState } from "../../store";

export type OrderStatusType = "pending" | "prepairing" | "on the way" | "delivered";

interface OrderItem {
  productId: string;
  name: string;
  quantity: string;
  size: PizzaSizesType;
  itemTotalPrice: number;
}

interface CouponType {
  code: string;
  discount: number;
}

export interface OrderType {
  id: string;
  status: OrderStatusType;
  subtotal: number;
  total: number;
  customerName: string;
  contactNumber: string;
  deliveryAddress: string;
  orderItems: OrderItem[];
  coupon?: CouponType;
  createdAt: string;
}

const initialState: OrderType[] = [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (_, action: PayloadAction<OrderType[]>) => {
      return action.payload;
    }
  }
});

export const selectOrders = (state: RootState) => state.orders;

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;

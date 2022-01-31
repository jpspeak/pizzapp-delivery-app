import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { StateType } from "../../../common/types";
import { db } from "../../../config/firebase";
import { RootState } from "../../../store";
import { OrderStatusType, OrderType } from "../../order-history/ordersSlice";

interface OrdersType {
  updateStatusState: StateType;
  orders: OrderType[];
}

const initialState: OrdersType = { updateStatusState: "READY", orders: [] };

export const updateStatus = createAsyncThunk("orders/updateStatusStatus", async ({ orderId, status }: { orderId: string; status: OrderStatusType }) => {
  const orderDocRef = doc(db, "orders", orderId);
  await updateDoc(orderDocRef, {
    status
  });
});

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderType[]>) => {
      state.orders = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(updateStatus.pending, (state, action) => {
      state.updateStatusState = "LOADING";
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      state.updateStatusState = "READY";
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      state.updateStatusState = "ERROR";
      console.log(action.error);
    });
  }
});

export const selectOrders = (state: RootState) => state.admin.orders.orders;
export const selectUpdateStatusState = (state: RootState) => state.admin.orders.updateStatusState;

export const { setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;

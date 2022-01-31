import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { StateType } from "../../common/types";
import { PizzaSizesType } from "../../components/RadioPizzaSize/Index";
import { db, functions } from "../../config/firebase";
import { RootState } from "../../store";
import { ProductType } from "../product/productSlice";

export interface BagItemType {
  productId: string;
  quantity: number;
  size: PizzaSizesType;
}

export interface BagItemWithProductType extends BagItemType {
  id?: string;
  product: ProductType;
}

interface CouponType {
  code: string;
  discount: number;
}

interface OrderSummaryType {
  subtotal: number;
  total: number;
  coupon?: CouponType;
}

interface BagType {
  bagItems: BagItemWithProductType[];
  bagItemsCount: number;
  orderSummary: OrderSummaryType;
  isOpenAddedToBagAlert: boolean;
  addState: StateType;
  incrementState: StateType;
  decrementState: StateType;
  applyCouponState: StateType;
  submitOrderState: StateType;
}

interface OrderFormDataType {
  fullname: string;
  contactNumber: string;
  deliveryAddress: string;
}

export const bagAdd = createAsyncThunk("bag/addStatus", async ({ productId, size, quantity }: BagItemWithProductType, { getState }) => {
  const state = getState() as RootState;
  const authUserId = state.auth.user?.id!;
  const bagColRef = collection(db, "user_data", authUserId, "bag");

  const q = query(bagColRef, where("productId", "==", productId), where("size", "==", size));
  const bagItemsSnapshot = await getDocs(q);
  if (bagItemsSnapshot.empty) {
    //doc not exist -> create new doc
    await addDoc(bagColRef, {
      productId,
      size,
      quantity
    });
  } else {
    //doc exists -> increment quantity
    await updateDoc(doc(db, "user_data", authUserId, "bag", bagItemsSnapshot.docs[0].id), {
      quantity: increment(quantity)
    });
  }
});

export const bagIncrementQuantity = createAsyncThunk("bag/incrementQuantityStatus", async ({ userId, bagItemId }: { userId: string; bagItemId: string }) => {
  const bagItemDocRef = doc(db, "user_data", userId, "bag", bagItemId);

  await updateDoc(bagItemDocRef, {
    quantity: increment(1)
  });
});

export const bagDecrementQuantity = createAsyncThunk("bag/decrementQuantityStatus", async ({ userId, bagItemId }: { userId: string; bagItemId: string }) => {
  const bagItemDocRef = doc(db, "user_data", userId, "bag", bagItemId);
  const bagItemSnapshot = await getDoc(bagItemDocRef);
  const bagItem = bagItemSnapshot.data() as BagItemType;
  // Delete if qty is 0 else decrement
  if (bagItem.quantity <= 1) {
    await deleteDoc(bagItemDocRef);
  } else {
    await updateDoc(bagItemDocRef, {
      quantity: increment(-1)
    });
  }
});

export const bagApplyCoupon = createAsyncThunk("bag/applyCouponStatus", async (payload: { code: string }) => {
  const q = query(collection(db, "coupons"), where("code", "==", payload.code));
  const couponSnapshot = await getDocs(q);
  if (couponSnapshot.empty) throw new Error("Invalid coupon");
  const coupon = couponSnapshot.docs[0].data() as CouponType;
  return coupon;
});

export const bagSubmitOrder = createAsyncThunk("bag/submitOrderStatus", async (payload: OrderFormDataType, { getState }) => {
  const state = getState() as RootState;
  const order = httpsCallable(functions, "order");
  const data = await order({ ...payload, couponCode: state.bag.orderSummary.coupon?.code });
  return data;
});

const initialState: BagType = {
  bagItems: [],
  bagItemsCount: 0,
  orderSummary: { subtotal: 0, total: 0 },
  isOpenAddedToBagAlert: false,
  addState: "READY",
  incrementState: "READY",
  decrementState: "READY",
  applyCouponState: "READY",
  submitOrderState: "READY"
};

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    bagSetBagItemsCount: (state, action: PayloadAction<number>) => {
      state.bagItemsCount = action.payload;
    },
    bagSetBagItems: (state, action: PayloadAction<BagItemWithProductType[]>) => {
      state.bagItems = action.payload;
      let subtotal = 0;

      //Calculate subtotal
      action.payload.forEach(bagItem => {
        const itemPrice = bagItem.product.prices[bagItem.size];
        const price = itemPrice * bagItem.quantity;
        subtotal = subtotal + price;
      });
      state.orderSummary.subtotal = subtotal;

      //Set total
      if (state.orderSummary.coupon) {
        state.orderSummary.total = subtotal - subtotal * state.orderSummary.coupon.discount;
      } else {
        state.orderSummary.total = subtotal;
      }
    },
    openAddedToBagAlert: state => {
      state.isOpenAddedToBagAlert = true;
    },
    closeAddedToBagAlert: state => {
      state.isOpenAddedToBagAlert = false;
    },
    clearCoupon: state => {
      state.orderSummary.coupon = undefined;
    }
  },
  extraReducers: builder => {
    // Add to bag
    builder.addCase(bagAdd.pending, state => {
      state.addState = "LOADING";
    });
    builder.addCase(bagAdd.fulfilled, state => {
      state.addState = "READY";
      state.isOpenAddedToBagAlert = true;
    });
    builder.addCase(bagAdd.rejected, (state, action) => {
      state.addState = "ERROR";
      console.log(action.error);
    });

    // Increment quantity
    builder.addCase(bagIncrementQuantity.pending, state => {
      state.incrementState = "LOADING";
    });
    builder.addCase(bagIncrementQuantity.fulfilled, state => {
      state.incrementState = "READY";
    });
    builder.addCase(bagIncrementQuantity.rejected, (state, action) => {
      state.incrementState = "ERROR";
      console.log(action.error);
    });

    // Decrement quantity
    builder.addCase(bagDecrementQuantity.pending, state => {
      state.decrementState = "LOADING";
    });
    builder.addCase(bagDecrementQuantity.fulfilled, state => {
      state.decrementState = "READY";
    });
    builder.addCase(bagDecrementQuantity.rejected, (state, action) => {
      state.decrementState = "ERROR";
      console.log(action.error);
    });

    // Apply coupon
    builder.addCase(bagApplyCoupon.pending, state => {
      state.applyCouponState = "LOADING";
    });
    builder.addCase(bagApplyCoupon.fulfilled, (state, action) => {
      state.applyCouponState = "READY";
      state.orderSummary.coupon = action.payload;
      state.orderSummary.total = state.orderSummary.subtotal - state.orderSummary.subtotal * action.payload.discount;
    });
    builder.addCase(bagApplyCoupon.rejected, (state, action) => {
      state.applyCouponState = "ERROR";
      console.log(action.error);
    });

    // Submit order
    builder.addCase(bagSubmitOrder.pending, state => {
      state.submitOrderState = "LOADING";
    });
    builder.addCase(bagSubmitOrder.fulfilled, (state, action) => {
      state.submitOrderState = "READY";
      state.orderSummary.coupon = undefined;
    });
    builder.addCase(bagSubmitOrder.rejected, (state, action) => {
      state.submitOrderState = "ERROR";
      console.log(action.error);
    });
  }
});

export const selectBagAddState = (state: RootState) => state.bag.addState;
export const selectIncrementState = (state: RootState) => state.bag.incrementState;
export const selectDecrementState = (state: RootState) => state.bag.decrementState;
export const selectApplyCouponState = (state: RootState) => state.bag.applyCouponState;
export const selectBagItems = (state: RootState) => state.bag.bagItems;
export const selectBagItemsCount = (state: RootState) => state.bag.bagItemsCount;
export const selectBagOrderSummary = (state: RootState) => state.bag.orderSummary;
export const selectIsOpenAddedToBagAlert = (state: RootState) => state.bag.isOpenAddedToBagAlert;
export const selectCoupon = (state: RootState) => state.bag.orderSummary.coupon;

export const { bagSetBagItems, bagSetBagItemsCount, openAddedToBagAlert, closeAddedToBagAlert } = bagSlice.actions;

export default bagSlice.reducer;

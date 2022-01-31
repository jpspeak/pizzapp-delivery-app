/* eslint-disable */
import * as functions from "firebase-functions";
import { initializeApp, firestore } from "firebase-admin";
import { HttpsError } from "firebase-functions/v1/https";
initializeApp();

export const onUserCreate = functions
  .region("asia-southeast1")
  .auth.user()
  .onCreate(user => {
    return firestore()
      .collection("user_data")
      .doc(user.uid)
      .set({
        address: null
      });
  });

interface BagItemType {
  productId: string;
  size: SizeType;
  quantity: number;
}

interface OrderFormDataType {
  fullname: string;
  contactNumber: string;
  deliveryAddress: string;
  couponCode?: string;
}

interface ProductType {
  name: string;
  description: string;
  prices: {
    regular: number;
    large: number;
    extraLarge: number;
  };
  available: boolean;
}

interface CouponType {
  code: string;
  discount: number;
}

type SizeType = "regular" | "large" | "extraLarge";

export const order = functions.https.onCall(async (data: OrderFormDataType, context: any) => {
  const userId = context?.auth?.uid;
  // const userId = "userid123";
  const customerName = data.fullname;
  const contactNumber = data.contactNumber;
  const deliveryAddress = data.deliveryAddress;
  const couponCode = data.couponCode || null;

  if (!userId) {
    throw new HttpsError("unauthenticated", "Unauthenticated");
  }

  if (!customerName && !contactNumber && !deliveryAddress) {
    throw new HttpsError("invalid-argument", "Make sure to fill up all the required field.");
  }

  // Get user bag
  const bagColRef = firestore()
    .collection("user_data")
    .doc(userId)
    .collection("bag");

  const bagSnapshot = await bagColRef.get();
  const bagItems: BagItemType[] = [];

  bagSnapshot.forEach(bagItem => {
    bagItems.push(bagItem.data() as BagItemType);
  });

  let subtotal = 0;
  let total = 0;
  let orderItems: any[] = [];
  let coupon: CouponType | undefined;

  // Get products prices using productId from bag items
  for (const bagItem of bagItems) {
    const productSnapshot = await firestore()
      .collection("products")
      .doc(bagItem.productId)
      .get();
    const product = productSnapshot.data() as ProductType;
    // Item total price = productPrice X quantity
    const itemTotalPrice = product.prices[bagItem.size] * bagItem.quantity;

    // Set orderItems
    orderItems.push({
      productId: productSnapshot.id,
      name: product.name,
      size: bagItem.size,
      quantity: bagItem.quantity,
      itemTotalPrice
    });

    subtotal += itemTotalPrice;
    total = subtotal;
  }

  //Check if coupon code valid
  const couponSnapshot = await firestore()
    .collection("coupons")
    .where("code", "==", couponCode)
    .get();

  if (!couponSnapshot.empty) {
    coupon = couponSnapshot.docs[0].data() as CouponType;

    // Apply discount
    total = total - total * coupon.discount;
  }

  // Store order to db
  const timestamp = firestore.FieldValue.serverTimestamp();
  let orderData: any = {
    userId,
    customerName,
    contactNumber,
    deliveryAddress,
    status: "pending",
    orderItems,
    subtotal,
    total,
    createdAt: timestamp
  };

  if (coupon) {
    orderData = { ...orderData, coupon };
  }

  await firestore()
    .collection("orders")
    .add(orderData);

  // Delete bag items
  bagSnapshot.forEach(bagItem => {
    bagItem.ref.delete();
  });

  return { success: true };
});

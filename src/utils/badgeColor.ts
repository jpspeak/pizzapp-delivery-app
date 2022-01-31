import { OrderStatusType } from "../features/order-history/ordersSlice";

const badgeColor = (status: OrderStatusType) => {
  switch (status) {
    case "pending":
      return "red";
    case "prepairing":
      return "blue";
    case "on the way":
      return "green";
    case "delivered":
      return "orange";
  }
};

export default badgeColor;

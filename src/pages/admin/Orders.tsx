import { Badge, Box, Container, Divider, Grid, GridItem, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import SelectStatus from "../../components/Admin/SelectStatus/Index";
import { db } from "../../config/firebase";
import { selectOrders, setOrders } from "../../features/admin/order/ordersSlice";
import { OrderType } from "../../features/order-history/ordersSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import badgeColor from "../../utils/badgeColor";

const Orders = () => {
  const orders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  let unsubscribe: any;

  const fetchOrders = () => {
    const ordersColRef = collection(db, "orders");
    const getNotDeliveredQuery = query(ordersColRef, where("status", "!=", "delivered"), orderBy("status"), orderBy("createdAt"));
    unsubscribe = onSnapshot(getNotDeliveredQuery, ordersSnapshot => {
      const orders: OrderType[] = [];
      ordersSnapshot.forEach(doc => {
        const order = { id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toDate()).toString() } as OrderType;
        orders.push(order);
      });
      dispatch(setOrders(orders));
    });
  };

  useEffect(() => {
    fetchOrders();

    return unsubscribe;
  }, []);

  return (
    <>
      <Container maxW='container.lg' minHeight='200px'>
        <Text my='12' fontSize='lg' fontWeight='bold'>
          Orders
        </Text>
        <VStack alignItems='normal'>
          {orders.map(order => (
            <Box key={order.id} boxShadow='base' px='2'>
              <Grid py='2' gridTemplateColumns='repeat(3, 1fr)'>
                <GridItem>
                  <Text>
                    Order ID:{" "}
                    <Box as='span' fontWeight='bold'>
                      {order.id}
                    </Box>
                  </Text>
                  <Text>
                    Customer name:{" "}
                    <Box as='span' fontWeight='bold'>
                      {order.customerName}
                    </Box>
                  </Text>
                  <Text>
                    Contact number:{" "}
                    <Box as='span' fontWeight='bold'>
                      {order.contactNumber}
                    </Box>
                  </Text>
                  <Text>
                    Delivery address:{" "}
                    <Box as='span' fontWeight='bold'>
                      {order.deliveryAddress}
                    </Box>
                  </Text>
                </GridItem>
                <GridItem justifySelf='center'>
                  <Text>
                    Status:{" "}
                    <Box as='span'>
                      <Badge colorScheme={badgeColor(order.status)} variant='solid'>
                        {order.status.toUpperCase()}
                      </Badge>
                    </Box>
                  </Text>
                </GridItem>
                <GridItem justifySelf='end'>
                  <SelectStatus orderId={order.id} currentStatus={order.status} />
                </GridItem>
              </Grid>
              <Divider />
              <VStack alignItems='normal' py='2'>
                {order.orderItems.map((orderItem, i) => (
                  <HStack key={i} justifyContent='space-between'>
                    <Text>
                      {orderItem.quantity} - {orderItem.name.toUpperCase()} - {orderItem.size.toUpperCase()}
                    </Text>
                    <Text>${orderItem.itemTotalPrice}</Text>
                  </HStack>
                ))}

                <Divider />
                <HStack justifyContent='space-between'>
                  <Text>Subtotal</Text>
                  <Text>${order.subtotal}</Text>
                </HStack>
                {order.coupon && (
                  <HStack justifyContent='space-between'>
                    <Text>
                      Discount{" "}
                      <span>
                        ({order.coupon.code} {order.coupon.discount * 100}%)
                      </span>
                    </Text>
                    <Text></Text>
                  </HStack>
                )}
                <HStack justifyContent='space-between' fontWeight='bold' fontSize='lg'>
                  <Text>Total</Text>
                  <Text>${order.total}</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default Orders;

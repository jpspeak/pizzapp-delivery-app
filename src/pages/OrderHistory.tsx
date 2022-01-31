import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Flex, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { db } from "../config/firebase";
import { selectAuthUser } from "../features/auth/authSlice";
import { OrderStatusType, OrderType, selectOrders, setOrders } from "../features/order-history/ordersSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import getDateOnly from "../utils/getDateOnly";
import isWithIn24Hours from "../utils/isWithIn24Hours";

const OrderHistory = () => {
  const user = useAppSelector(selectAuthUser);
  const userOrders = useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  let unsubscribe: any;
  const fetchUserOrders = async () => {
    if (user) {
      const getUserOrdersQuery = query(collection(db, "orders"), where("userId", "==", user?.id), orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(getUserOrdersQuery, userOrdersSnapshot => {
        const userOrders = [] as OrderType[];
        userOrdersSnapshot.forEach(doc => {
          userOrders.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toDate()).toString() } as OrderType);
        });
        console.log(userOrders);
        dispatch(setOrders(userOrders));
      });
    }
  };

  const isPrepairing = (status: OrderStatusType) => {
    return status === "prepairing" || status === "on the way" || status === "delivered";
  };
  const isOnTheWay = (status: OrderStatusType) => {
    return status === "on the way" || status === "delivered";
  };
  const isDelivered = (status: OrderStatusType) => {
    return status === "delivered";
  };

  useEffect(() => {
    fetchUserOrders();
    return unsubscribe;
  }, [user]);
  return (
    <>
      <Container maxW='container.lg' minHeight='200px'>
        <Text my='12' fontSize='lg' fontWeight='bold'>
          Order History
        </Text>
        <VStack alignItems='normal'>
          {userOrders.map(userOrder => (
            <Box key={userOrder.id} shadow='base'>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Flex flex='1' textAlign='left' mr='2'>
                        <Text flex='1' fontSize='sm'>
                          Order ID:
                          <Box as='span' px='2' fontWeight='bold'>
                            {userOrder.id}
                          </Box>
                        </Text>
                        <Text fontSize='xs'>{getDateOnly(new Date(userOrder.createdAt))}</Text>
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel py={4}>
                    <VStack alignItems='normal'>
                      {userOrder.orderItems.map((orderItem, i) => (
                        <Text key={i}>
                          {orderItem.quantity} - {orderItem.name.toUpperCase()} - {orderItem.size.toUpperCase()}
                        </Text>
                      ))}
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              {isWithIn24Hours(new Date(userOrder.createdAt)) && (
                <HStack py='8' width='full' justifyContent='space-around' color='blackAlpha.400' fontSize='sm'>
                  <VStack>
                    <Image src='/baking.svg' h='14' w='14' color='red' opacity={isPrepairing(userOrder.status) ? 1 : 0.4} />
                    <HStack>
                      <Text color={isPrepairing(userOrder.status) ? "blackAlpha.800" : "inherit"}>Prepairing</Text>
                      {isPrepairing(userOrder.status) && <Icon as={BsFillPatchCheckFill} color='green.500' />}
                    </HStack>
                  </VStack>
                  <VStack>
                    <Image src='/rider.svg' h='14' w='14' color='red' opacity={isOnTheWay(userOrder.status) ? 1 : 0.4} />
                    <HStack>
                      <Text color={isOnTheWay(userOrder.status) ? "blackAlpha.800" : "inherit"}>On the way</Text>
                      {isOnTheWay(userOrder.status) && <Icon as={BsFillPatchCheckFill} color='green.500' />}
                    </HStack>
                  </VStack>
                  <VStack>
                    <Image src='/delivered.svg' h='14' w='14' color='red' opacity={isDelivered(userOrder.status) ? 1 : 0.4} />
                    <HStack>
                      <Text color={isDelivered(userOrder.status) ? "blackAlpha.800" : "inherit"}>Delivered</Text>
                      {isDelivered(userOrder.status) && <Icon as={BsFillPatchCheckFill} color='green.500' />}
                    </HStack>
                  </VStack>
                </HStack>
              )}
            </Box>
          ))}
        </VStack>
      </Container>
    </>
  );
};

export default OrderHistory;

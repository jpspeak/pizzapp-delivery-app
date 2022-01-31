import { Text, Container, Divider, Flex, Grid, VStack } from "@chakra-ui/react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import BagItem from "../components/BagItem/Index";
import CouponInput from "../components/CouponInput/Index";
import OrderSubmissionModal from "../components/OrderSubmissionModal/Index";
import { db } from "../config/firebase";
import { selectAuthUser } from "../features/auth/authSlice";
import { BagItemType, selectBagItems, bagSetBagItems, selectBagOrderSummary, BagItemWithProductType, selectCoupon } from "../features/bag/bagSlice";
import { ProductType } from "../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Bag = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const bagItems = useAppSelector(selectBagItems);
  const coupon = useAppSelector(selectCoupon);
  const { total, subtotal } = useAppSelector(selectBagOrderSummary);

  let unsubscribe: () => void;

  const fetchBag = async (userId: string) => {
    const bagColRef = collection(db, "user_data", userId, "bag");
    unsubscribe = onSnapshot(bagColRef, async bagSnapshot => {
      const bagItems = await Promise.all(
        bagSnapshot.docs.map(async bagItemSnapshot => {
          const bagItemId = bagItemSnapshot.id;
          const bagItem = bagItemSnapshot.data() as BagItemType;
          const productDocRef = doc(db, "products", bagItem.productId);
          const productSnapshot = await getDoc(productDocRef);
          const productId = productSnapshot.id;
          const product = productSnapshot.data() as ProductType;
          return { id: bagItemId, productId, product, size: bagItem.size, quantity: bagItem.quantity };
        })
      );
      dispatch(bagSetBagItems(bagItems as BagItemWithProductType[]));
    });
  };

  useEffect(() => {
    if (user) {
      fetchBag(user?.id);
    }
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <></>;
  return (
    <>
      <Container maxW='container.lg' minHeight='200px'>
        <Text my='12' fontSize='lg' fontWeight='bold'>
          Order Summary
        </Text>
        {bagItems.length > 0 && (
          <>
            <Grid gridTemplateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={20}>
              <VStack alignItems='normal'>
                {bagItems.map(bagItem => (
                  <BagItem key={bagItem.id} bagItem={bagItem} />
                ))}
              </VStack>
              <VStack alignItems='normal' spacing={4}>
                <CouponInput />
                <Flex justifyContent='space-between'>
                  <Text fontSize='xl'>Subtotal</Text>
                  <Text fontSize='xl'>${subtotal}</Text>
                </Flex>
                <Flex justifyContent='space-between'>
                  <Text fontSize='xl'>Discount</Text>
                  <Text fontSize='xl'>{coupon ? coupon?.discount * 100 : 0}%</Text>
                </Flex>
                <Divider />
                <Flex justifyContent='space-between' fontSize='xl' fontWeight='bold'>
                  <Text>Total</Text>
                  <Text>${total}</Text>
                </Flex>
                <Flex justifyContent='stretch'>
                  <OrderSubmissionModal />
                </Flex>
              </VStack>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};

export default Bag;

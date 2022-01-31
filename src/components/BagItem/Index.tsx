import { Button, HStack, Image, Input, Spacer, Text, VStack } from "@chakra-ui/react";
import { selectAuthUser } from "../../features/auth/authSlice";
import { bagDecrementQuantity, bagIncrementQuantity, BagItemWithProductType, selectDecrementState, selectIncrementState } from "../../features/bag/bagSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const BagItem = ({ bagItem }: { bagItem: BagItemWithProductType }) => {
  const user = useAppSelector(selectAuthUser);
  const incrementState = useAppSelector(selectIncrementState);
  const decrementState = useAppSelector(selectDecrementState);
  const dispatch = useAppDispatch();

  if (!user) return <></>;
  return (
    <>
      <HStack px='4' py='2' shadow='base' spacing='4' alignItems='stretch'>
        <Image src={bagItem.product.image} alt='pizza' h='16' w='16' />
        <VStack alignItems='normal' justifyContent='space-between'>
          <Text fontWeight='bold'>{bagItem.product.name}</Text>
          <Text color='blackAlpha.700' mt='2'>
            Size: {bagItem.size}
          </Text>
        </VStack>
        <Spacer />
        <VStack alignItems='end'>
          <HStack w='100px'>
            <Button
              disabled={decrementState === "LOADING" || incrementState === "LOADING"}
              onClick={() => dispatch(bagDecrementQuantity({ userId: user.id, bagItemId: bagItem.id! }))}
              rounded='none'
              size='xs'
              colorScheme='orange'
              fontSize='lg'
            >
              -
            </Button>
            <Input readOnly size='xs' value={bagItem.quantity} border='none' p='0' textAlign='center' />
            <Button
              disabled={incrementState === "LOADING" || decrementState === "LOADING"}
              onClick={() => dispatch(bagIncrementQuantity({ userId: user.id, bagItemId: bagItem.id! }))}
              rounded='none'
              size='xs'
              colorScheme='orange'
              fontSize='lg'
            >
              +
            </Button>
          </HStack>
          <Spacer />
          <Text fontWeight='bold'>${bagItem.product.prices[bagItem.size] * bagItem.quantity}</Text>
        </VStack>
      </HStack>
    </>
  );
};

export default BagItem;

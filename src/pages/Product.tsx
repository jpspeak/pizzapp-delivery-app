import { Box, Button, Container, FormControl, FormLabel, Grid, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import AddedToBagAlert from "../components/AddedToBagAlert/Index";
import RadioPizzaSize, { PizzaSizesType } from "../components/RadioPizzaSize/Index";
import { openAuthModal, selectAuthUser } from "../features/auth/authSlice";
import { bagAdd, selectBagAddState } from "../features/bag/bagSlice";
import { selectProductFetchState, selectProduct, productFetch } from "../features/product/productSlice";
import { useAppSelector } from "../hooks";

interface FormDataType {
  size: PizzaSizesType;
  quantity: number;
}

const Product = () => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useDispatch();
  const bagAddState = useAppSelector(selectBagAddState);
  const productFetchState = useAppSelector(selectProductFetchState);
  const { productId } = useParams();
  const product = useAppSelector(selectProduct);

  const [formdata, setFormdata] = useState<FormDataType>({
    size: "regular",
    quantity: 1
  });
  const [price, setPrice] = useState<number | undefined>(product?.prices.regular);

  const handleChangeSize = (value: PizzaSizesType) => {
    setFormdata(prevState => ({ ...prevState, size: value }));
  };

  const handleQuantityChange = (value: string) => {
    setFormdata(prevState => ({ ...prevState, quantity: +value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      product && dispatch(bagAdd({ productId: product.id, product, ...formdata }));
    } else {
      dispatch(openAuthModal());
    }
  };

  useEffect(() => {
    productId && dispatch(productFetch(productId));
  }, [productId, dispatch]);

  useEffect(() => {
    product && setPrice(product.prices[formdata.size] * formdata.quantity);
  }, [formdata, product]);

  if (productFetchState === "ERROR") return <p>Failed to load product.</p>;
  if (productFetchState === "LOADING") return <p>Loading...</p>;
  return (
    <>
      <Container maxW='container.lg'>
        <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} columnGap={12}>
          <Box position='relative' pb='100%' mt='8'>
            <Image src={product?.image} position='absolute' alt='pizza' />
          </Box>
          <Box>
            <Text mt='12' fontSize='2xl' fontWeight='bold'>
              {product?.name}
            </Text>
            <Text mt='4' fontSize='lg' color='blackAlpha.700'>
              {product?.description}
            </Text>
            <Text mt='4' fontSize='2xl' fontWeight='bold' color='orange.500'>
              $ {price}
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl mt='12'>
                <FormLabel fontSize='lg' fontWeight='bold'>
                  Select size
                </FormLabel>
                <RadioPizzaSize onChange={handleChangeSize} />
              </FormControl>
              <FormControl mt='12'>
                <FormLabel htmlFor='quantity' fontSize='lg' fontWeight='bold'>
                  Quantity
                </FormLabel>
                <NumberInput mt='2' width='100px' defaultValue={formdata.quantity} min={1} max={100} onChange={handleQuantityChange} value={formdata.quantity} name='quantity'>
                  <NumberInputField id='quantity' required />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button isLoading={bagAddState === "LOADING"} colorScheme='orange' mt='12' rounded='none' type='submit'>
                ADD TO BAG
              </Button>
            </form>
          </Box>
        </Grid>
      </Container>
      <AddedToBagAlert />
    </>
  );
};

export default Product;

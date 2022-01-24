import { Box, Button, Container, FormControl, FormLabel, Grid, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import AddedToBagAlert from "../components/AddedToBagAlert/Index";
import RadioPizzaSize, { SizesType } from "../components/RadioPizzaSize/Index";
import { add } from "../features/bag/bagSlice";
import { fetchProduct, selectProduct } from "../features/product/productSlice";
import { useAppSelector } from "../hooks";

interface FormDataType {
  size: SizesType;
  quantity: number;
}

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useAppSelector(selectProduct);

  const [formdata, setFormdata] = useState<FormDataType>({
    size: "R",
    quantity: 1
  });

  const handleChangeSize = (value: SizesType) => {
    setFormdata(prevState => ({ ...prevState, size: value }));
  };

  const handleQuantityChange = (value: string) => {
    setFormdata(prevState => ({ ...prevState, quantity: +value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    product && dispatch(add({ ...formdata, product }));
  };

  useEffect(() => {
    productId && dispatch(fetchProduct(+productId));
  }, [productId, dispatch]);

  if (error) return <p>Failed to load products</p>;
  if (loading) return <p>Loading</p>;
  return (
    <>
      <Container maxW='container.lg'>
        <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}>
          <Box position='relative' pb='100%'>
            <img src='/logo.png' style={{ position: "absolute" }} alt='pizza' />
          </Box>
          <Box p='4'>
            <Text mt='12' fontSize='2xl' fontWeight='bold'>
              {product?.attributes.name}
            </Text>
            <Text mt='4' fontSize='lg' color='blackAlpha.700'>
              {product?.attributes.description}
            </Text>
            <Text mt='4' fontSize='2xl' fontWeight='bold' color='orange.500'>
              $ {product?.attributes.price}
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

              <Button colorScheme='orange' mt='12' rounded='none' type='submit'>
                ADD TO BAG
              </Button>
            </form>
          </Box>
        </Grid>
      </Container>
      {/* <AddedToBagAlert /> */}
    </>
  );
};

export default Product;

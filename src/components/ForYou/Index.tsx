import { Container, Grid, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { productsFetch, selectProducts } from "../../features/product/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProductItem from "../ProductItem/Index";

const ForYou = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  useEffect(() => {
    dispatch(productsFetch());
  }, []);
  return (
    <>
      <Container maxW='container.lg'>
        <Heading my='12'>For You</Heading>
        <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(5, 1fr)" }} columnGap={4} rowGap={8}>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
        <Link to='/products'>
          <Text _hover={{ textDecor: "underline" }} textAlign='center' mt='20' fontWeight='semibold' fontSize='lg'>
            View Menu
          </Text>
        </Link>
      </Container>
    </>
  );
};

export default ForYou;

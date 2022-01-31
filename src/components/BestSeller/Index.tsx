import { Container, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { productsFetchBestSeller, selectProductsBestSellers } from "../../features/product/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ProductItem from "../ProductItem/Index";

const BestSeller = () => {
  const dispatch = useAppDispatch();
  const bestSellers = useAppSelector(selectProductsBestSellers);
  useEffect(() => {
    dispatch(productsFetchBestSeller());
  }, []);
  return (
    <>
      <Container maxW='container.lg'>
        <Heading my='12'>Best Sellers</Heading>
        <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(5, 1fr)" }} columnGap={4} rowGap={8}>
          {bestSellers.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default BestSeller;

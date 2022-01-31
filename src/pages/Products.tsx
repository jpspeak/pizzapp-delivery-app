import { Container, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem/Index";
import { selectProductsFetchState, selectProducts, productsFetch } from "../features/product/productsSlice";
import { useAppSelector } from "../hooks";

const Products = () => {
  const products = useAppSelector(selectProducts);
  const productsFetchState = useAppSelector(selectProductsFetchState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  if (productsFetchState === "ERROR") return <p>Failed to load products.</p>;
  return (
    <>
      <Container maxW='container.lg'>
        <Heading my='12'>Menu</Heading>
        <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(5, 1fr)" }} columnGap={4} rowGap={8}>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;

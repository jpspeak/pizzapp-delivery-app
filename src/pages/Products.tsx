import { Container, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductItem from "../components/ProductItem/Index";
import { fetchProducts, selectProducts } from "../features/product/productsSlice";
import { useAppSelector } from "../hooks";

const Products = () => {
  const { products, loading, error } = useAppSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Container maxW='container.lg'>
        <Heading my='12'>Menu</Heading>
        {error && <p>Unable to load products</p>}
        {loading && <p>Loading</p>}
        {!loading && (
          <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(5, 1fr)" }} gap={4}>
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Products;

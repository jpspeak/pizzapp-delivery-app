import { Container, Grid, Heading } from "@chakra-ui/react";
import ProductItem from "../ProductItem/Index";

const BestSelling = () => {
  return (
    <>
      <Container maxW='container.lg'>
        <Heading my='12'>Best Selling</Heading>
        <Grid templateColumns={{ md: "repeat(5, 1fr)" }} gap={4}>
          {/* {[1, 2, 3, 4, 5, 6, 8, 9].map((product, i) => (
            <ProductItem key={i} product={{}} />
          ))} */}
        </Grid>
      </Container>
    </>
  );
};

export default BestSelling;

import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ProductType } from "../../features/product/productSlice";

const ProductItem = ({ product }: { product: ProductType }) => {
  return (
    <>
      <Link to={`/products/${product.id}`}>
        <Box>
          <Box position='relative' pb='100%'>
            <img src={product.image} style={{ position: "absolute" }} alt='pizza' />
          </Box>

          <Text fontWeight='bold' textAlign='center'>
            {product.name}
          </Text>

          <Text color='orange.500' fontWeight='bold' textAlign='center'>
            ${product.prices.regular}
          </Text>

          <Text mt='2' color='blackAlpha.600' fontSize='sm' fontWeight='semibold' textAlign='center' noOfLines={3}>
            {product.description}
          </Text>
        </Box>
      </Link>
    </>
  );
};

export default ProductItem;

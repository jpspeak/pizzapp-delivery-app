import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Product } from "../../features/product/productsSlice";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <>
      <Link to={`/products/${product.id}`}>
        <Box>
          <Box position='relative' pb='100%'>
            <img src='/logo.png' style={{ position: "absolute" }} alt='pizza' />
          </Box>

          <Text fontWeight='bold' textAlign='center'>
            {product.attributes.name}
          </Text>

          <Text color='orange.500' fontWeight='bold' textAlign='center'>
            ${product.attributes.price}
          </Text>

          <Text mt='2' color='blackAlpha.600' fontSize='sm' fontWeight='semibold' textAlign='center' noOfLines={3}>
            {product.attributes.description}
          </Text>
        </Box>
      </Link>
    </>
  );
};

export default ProductItem;

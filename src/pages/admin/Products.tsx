import { Badge, Box, Container, HStack, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash, HiPlus } from "react-icons/hi";
import CreateProductModal from "../../components/Admin/CreateProductModal/Index";
import EditProductModal from "../../components/Admin/EditProductModal/Index";
import { db } from "../../config/firebase";
import { deleteProduct, openCreateProductModal, openEditProductModal } from "../../features/admin/product/productFormModalSlice";
import { ProductType, selectProducts, setProducts } from "../../features/admin/product/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  let unsubscribe: any;

  const fetchProducts = () => {
    const productsColRef = collection(db, "products");
    unsubscribe = onSnapshot(productsColRef, productsSnapshot => {
      const products: ProductType[] = [];
      productsSnapshot.forEach(doc => {
        const product = { id: doc.id, ...doc.data() } as ProductType;
        products.push(product);
      });
      dispatch(setProducts(products));
    });
  };

  useEffect(() => {
    fetchProducts();
    return unsubscribe;
  }, []);

  return (
    <>
      <Container maxW='container.lg' minHeight='200px'>
        <HStack justifyContent='space-between'>
          <Text my='12' fontSize='lg' fontWeight='bold'>
            Products
          </Text>
          <IconButton onClick={() => dispatch(openCreateProductModal())} aria-label='add' colorScheme='orange' size='sm' icon={<HiPlus />}></IconButton>
        </HStack>
        <VStack alignItems='normal'>
          {products.map(product => (
            <HStack key={product.id} shadow='base' p='2' alignItems='start' fontSize='sm' color='blackAlpha.600'>
              <Image src={product.image} alt='pizza' h='70px' w='70px' p='1' border='1px solid #dcdcdc' rounded='md' />
              <VStack alignItems='normal' w='full'>
                <Text fontWeight='bold' color='blackAlpha.800'>
                  {product.name}
                </Text>
                <Text>{product.description}</Text>
                <HStack>
                  <Text>
                    Regular:{" "}
                    <Box as='span' color='blackAlpha.800' fontWeight='bold'>
                      ${product.prices?.regular}
                    </Box>
                  </Text>
                  <Text>
                    Large:{" "}
                    <Box as='span' color='blackAlpha.800' fontWeight='bold'>
                      ${product.prices?.large}
                    </Box>
                  </Text>
                  <Text>
                    Extra Large:{" "}
                    <Box as='span' color='blackAlpha.800' fontWeight='bold'>
                      ${product.prices?.extraLarge}
                    </Box>{" "}
                  </Text>
                </HStack>
                <Badge variant='solid' colorScheme={product.status === "available" ? "green" : "red"} w='max-content'>
                  {product.status}
                </Badge>
              </VStack>
              <HStack>
                <IconButton onClick={() => dispatch(openEditProductModal(product))} aria-label='edit' size='sm' icon={<HiOutlinePencilAlt />} />
                <IconButton onClick={() => dispatch(deleteProduct(product))} aria-label='delete' size='sm' icon={<HiOutlineTrash />} />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </Container>
      <CreateProductModal />
      <EditProductModal />
    </>
  );
};

export default Products;

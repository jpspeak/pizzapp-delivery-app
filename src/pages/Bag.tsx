import { Button, Text, Container, Divider, Flex, Grid, HStack, Image, Input, Spacer, VStack } from "@chakra-ui/react";

const Bag = () => {
  return (
    <>
      <Container maxW='container.lg' minHeight='200px'>
        <Text my='12' fontSize='lg' fontWeight='bold'>
          Order Summary
        </Text>
        <Grid gridTemplateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={20}>
          <VStack alignItems='normal'>
            <HStack px='4' py='2' shadow='base' spacing='4' alignItems='stretch'>
              <Image src='/logo.png' alt='pizza' h='16' w='16' />
              <VStack alignItems='normal' justifyContent='space-between'>
                <Text fontWeight='bold'>Product Name</Text>
                <Text color='blackAlpha.700' mt='2'>
                  Size: L
                </Text>
              </VStack>
              <Spacer />
              <VStack alignItems='end'>
                <HStack w='100px'>
                  <Button rounded='none' size='xs' colorScheme='orange' fontSize='lg'>
                    -
                  </Button>
                  <Input readOnly size='xs' value='10' border='none' p='0' textAlign='center' />
                  <Button rounded='none' size='xs' colorScheme='orange' fontSize='lg'>
                    +
                  </Button>
                </HStack>
                <Spacer />
                <Text fontWeight='bold'>$60</Text>
              </VStack>
            </HStack>
            <HStack px='4' py='2' shadow='base' spacing='4' alignItems='stretch'>
              <Image src='/logo.png' alt='pizza' h='16' w='16' />
              <VStack alignItems='normal' justifyContent='space-between'>
                <Text fontWeight='bold'>Product Name</Text>
                <Text color='blackAlpha.700' mt='2'>
                  Size: L
                </Text>
              </VStack>
              <Spacer />
              <VStack alignItems='end'>
                <HStack w='100px'>
                  <Button rounded='none' size='xs' colorScheme='orange' fontSize='lg'>
                    -
                  </Button>
                  <Input readOnly size='xs' value='10' border='none' p='0' textAlign='center' />
                  <Button rounded='none' size='xs' colorScheme='orange' fontSize='lg'>
                    +
                  </Button>
                </HStack>
                <Spacer />
                <Text fontWeight='bold'>$60</Text>
              </VStack>
            </HStack>
            <HStack px='4' py='2' shadow='base' spacing='4' alignItems='stretch'>
              <Image src='/logo.png' alt='pizza' h='16' w='16' />
              <VStack alignItems='normal' justifyContent='space-between'>
                <Text fontWeight='bold'>Product Name</Text>
                <Text color='blackAlpha.700' mt='2'>
                  Size: L
                </Text>
              </VStack>
              <Spacer />
              <VStack alignItems='end'>
                <HStack w='100px'>
                  <Button rounded='none' size='xs' colorScheme='orange' fontSize='lg'>
                    -
                  </Button>
                  <Input readOnly size='xs' value='10' border='none' p='0' textAlign='center' />
                  <Button rounded='none' size='xs' colorScheme='orange' fontSize='lg'>
                    +
                  </Button>
                </HStack>
                <Spacer />
                <Text fontWeight='bold'>$60</Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack alignItems='normal' spacing={4}>
            <Flex justifyContent='space-between'>
              <Input placeholder='Enter coupon' w='40'></Input>
            </Flex>
            <Flex justifyContent='space-between'>
              <Text fontSize='xl'>Subtotal</Text>
              <Text fontSize='xl'>$30</Text>
            </Flex>
            <Divider />
            <Flex justifyContent='space-between' fontSize='xl' fontWeight='bold'>
              <Text>Total</Text>
              <Text>$100</Text>
            </Flex>
            <Flex justifyContent='stretch'>
              <Button rounded='none' colorScheme='orange' width='full'>
                PLACE ORDER
              </Button>
            </Flex>
          </VStack>
        </Grid>
      </Container>
    </>
  );
};

export default Bag;

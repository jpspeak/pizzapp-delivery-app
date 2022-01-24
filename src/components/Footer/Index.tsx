import { Box, Container, Flex, Grid, HStack, Icon, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <>
      <Box as='footer' bgColor='yellow.900' mt='40' px='4' py='12' color='white'>
        <Container maxW='container.lg'>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={8}>
            <Box>
              <Text my='4' fontWeight='bold'>
                COMPANY
              </Text>
              <Link to='#'>
                <Text _hover={{ textDecor: "underline" }}>About Us</Text>
              </Link>
              <Link to='#'>
                <Text _hover={{ textDecor: "underline" }}>Our Services</Text>
              </Link>
              <Link to='#'>
                <Text _hover={{ textDecor: "underline" }}>Blog</Text>
              </Link>
            </Box>
            <Box>
              <Text my='4' fontWeight='bold'>
                Contact
              </Text>
              <Text>lorem_pizza@mail.com</Text>
              <HStack mt='4'>
                <Flex justifyContent='center' alignItems='center' h='30px' w='30px' rounded='full' bgColor='white'>
                  <Icon as={FaFacebookF} color='yellow.900' />
                </Flex>
                <Flex justifyContent='center' alignItems='center' h='30px' w='30px' rounded='full' bgColor='white'>
                  <Icon as={AiFillInstagram} color='yellow.900' />
                </Flex>
                <Flex justifyContent='center' alignItems='center' h='30px' w='30px' rounded='full' bgColor='white'>
                  <Icon as={FaTwitter} color='yellow.900' />
                </Flex>
              </HStack>
            </Box>
            <Box>
              <Text my='4' fontWeight='bold'>
                ADDRESS
              </Text>
              <Text as='address'>Keas 69 Str. 15234, Chalandri Athens, Greece</Text>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Footer;

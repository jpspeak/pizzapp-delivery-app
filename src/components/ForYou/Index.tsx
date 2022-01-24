import { Container, Grid, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ForYou = () => {
  return (
    <>
      <Container maxW='container.lg'>
        <Heading my='12'>For You</Heading>
        <Grid templateColumns={{ md: "repeat(5, 1fr)" }} gap={4}></Grid>
        <Link to='/menu'>
          <Text _hover={{ textDecor: "underline" }} textAlign='center' mt='20' fontWeight='semibold' fontSize='lg'>
            View Menu
          </Text>
        </Link>
      </Container>
    </>
  );
};

export default ForYou;

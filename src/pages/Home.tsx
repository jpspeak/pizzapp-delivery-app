import { Box, Container } from "@chakra-ui/react";
import BestSeller from "../components/BestSeller/Index";
import Carousel from "../components/Carousel/Index";
import ForYou from "../components/ForYou/Index";

const Home = () => {
  return (
    <>
      <Box bgColor='orange'>
        <Container maxW='container.lg'>
          <Carousel />
        </Container>
      </Box>
      <BestSeller />
      <ForYou />
    </>
  );
};

export default Home;

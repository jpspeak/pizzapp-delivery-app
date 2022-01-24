import { Box, Container } from "@chakra-ui/react";
import BestSelling from "../components/BestSelling/Index";
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
      <BestSelling />
      <ForYou />
    </>
  );
};

export default Home;

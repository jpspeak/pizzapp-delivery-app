import { Box, Container, Grid, GridItem, HStack, Icon } from "@chakra-ui/react";
import IconButtonBadge from "../common/IconButtonBadge";
import { HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
const Header = () => {
  return (
    <>
      <Box bgColor='orange' color='yellow.900'>
        <Container maxW='container.lg'>
          <Grid alignItems='center' gridTemplateColumns='repeat(3, 1fr)'>
            <GridItem>
              <img src='/logo.png' alt='logo' width='85' />
            </GridItem>
            <GridItem rowStart={{ base: 2, md: 1 }} colStart={{ base: 1, md: 2 }} colEnd={{ base: 4, md: 3 }} overflowX={{ base: "auto", md: "unset" }}>
              <HStack as='nav' fontWeight='extrabold' letterSpacing='wide' minW='400px' justifyContent='space-evenly' spacing='8'>
                <NavLink to='/' text='Home' />
                <NavLink to='/products' text='Menu' />
                <NavLink to='/favorites' text='Favorites' />
                <NavLink to='/my-order' text='My Order' />
              </HStack>
            </GridItem>
            <GridItem justifySelf='end' colStart={{ base: 3 }}>
              <Link to='/bag'>
                <IconButtonBadge icon={<Icon as={HiShoppingBag} color='' height='7' width='7' />} text='3' />
              </Link>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;

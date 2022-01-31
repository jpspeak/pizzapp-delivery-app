import { Box, Button, Container, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { openAuthModal, selectAuthUser } from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import HeaderNavLink from "../../HeaderNavLink/NavLink";
import ProfileMenuButton from "../ProfileMenuButton/Index";

const Header = () => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box bgColor='orange' color='#5B1A00'>
        <Container maxW='container.lg'>
          <Grid alignItems='center' gridTemplateColumns='repeat(3, 1fr)'>
            <GridItem>
              <HStack>
                <Link to='/'>
                  <img src='/logo.png' alt='logo' width='60' />
                </Link>
                <Text fontSize='sm' fontWeight='bold'>
                  ADMIN
                </Text>
              </HStack>
            </GridItem>
            <GridItem alignSelf='stretch' rowStart={{ base: 2, md: 1 }} colStart={{ base: 1, md: 2 }} colEnd={{ base: 4, md: 3 }} overflowX={{ base: "auto", md: "unset" }}>
              <HStack h='full' as='nav' fontWeight='extrabold' letterSpacing='wide' minW='350px' justifyContent='space-evenly' spacing='8'>
                <HeaderNavLink to='/admin' text='Orders' />
                <HeaderNavLink to='/admin/products' text='Products' />
              </HStack>
            </GridItem>
            <GridItem justifySelf='end' colStart={{ base: 3 }}>
              {user ? (
                <ProfileMenuButton />
              ) : (
                <Button onClick={() => dispatch(openAuthModal())} rounded='full' colorScheme='orange'>
                  Sign In
                </Button>
              )}
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Header;

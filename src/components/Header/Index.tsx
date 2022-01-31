import { Box, Button, Container, Grid, GridItem, HStack, Icon } from "@chakra-ui/react";
import IconButtonBadge from "../common/IconButtonBadge";
import { HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import AppDrawer from "../AppDrawer/Index";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openAuthModal, selectAuthUser } from "../../features/auth/authSlice";
import { bagSetBagItemsCount, selectBagItemsCount } from "../../features/bag/bagSlice";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import HeaderNavLink from "../HeaderNavLink/NavLink";

const Header = () => {
  const user = useAppSelector(selectAuthUser);
  const bagItemsCount = useAppSelector(selectBagItemsCount);
  const dispatch = useAppDispatch();
  let unsubscribe: () => void;

  const fetchBagItemsCount = async (userId: string) => {
    const bagColRef = collection(db, "user_data", userId, "bag");
    unsubscribe = onSnapshot(bagColRef, async bagSnapshot => {
      dispatch(bagSetBagItemsCount(bagSnapshot.size));
    });
  };

  useEffect(() => {
    user && fetchBagItemsCount(user.id);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Box bgColor='orange' color='#5B1A00'>
        <Container maxW='container.lg'>
          <Grid alignItems='center' gridTemplateColumns='repeat(3, 1fr)'>
            <GridItem>
              <HStack>
                <AppDrawer />
                <img src='/logo.png' alt='logo' width='85' />
              </HStack>
            </GridItem>
            <GridItem rowStart={{ base: 2, md: 1 }} colStart={{ base: 1, md: 2 }} colEnd={{ base: 4, md: 3 }} overflowX={{ base: "auto", md: "unset" }}>
              <HStack as='nav' fontWeight='extrabold' letterSpacing='wide' minW='350px' justifyContent='space-evenly' spacing='8'>
                <HeaderNavLink to='/' text='Home' />
                <HeaderNavLink to='/products' text='Menu' />
                <HeaderNavLink to='/best-seller' text='Best Seller' />
                <HeaderNavLink to='/blog' text='Blog' />
              </HStack>
            </GridItem>
            <GridItem justifySelf='end' colStart={{ base: 3 }}>
              {user ? (
                <Link to='/bag'>
                  <IconButtonBadge icon={<Icon as={HiShoppingBag} color='#5B1A00' height='7' width='7' />} text={bagItemsCount} />
                </Link>
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

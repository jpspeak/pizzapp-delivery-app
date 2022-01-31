import {
  Avatar,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { HiOutlineDocumentText, HiOutlineLogin, HiOutlineLogout, HiOutlineMenuAlt2 } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import { openAuthModal, selectAuthUser, signOutUser } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const AppDrawerItem = ({ text, icon, onClick }: { text: string; icon: IconType; onClick: () => void }) => {
  return (
    <>
      <HStack onClick={onClick} as='button' _hover={{ bgColor: "gray.100" }} py='2' px='4'>
        <Icon as={icon} />
        <Text> {text}</Text>
      </HStack>
    </>
  );
};

const AppDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();

  const handleOnClickOrderHistory = () => {
    onClose();
    navigate("/order-history");
  };
  return (
    <>
      <IconButton aria-label='drawer' variant='ghost' onClick={onOpen} _hover={{ bgColor: "none" }} icon={<Icon as={HiOutlineMenuAlt2} h='8' w='8' />} />
      <Drawer autoFocus={false} isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt='2' />
          <DrawerHeader px='4'>
            <HStack>
              <Avatar src={user?.photoURL || undefined} size='sm' />
              <Text pr='8' color='blackAlpha.800' isTruncated>
                {user?.displayName}
              </Text>
            </HStack>
          </DrawerHeader>
          <Divider />
          <DrawerBody px='2'>
            <Flex h='full' flexDir='column' alignItems='normal' fontSize='xl'>
              {user ? (
                <>
                  <VStack alignItems='normal' mt='4' spacing={2}>
                    <AppDrawerItem text='Order History' icon={HiOutlineDocumentText} onClick={handleOnClickOrderHistory} />
                  </VStack>

                  <Spacer />
                  <AppDrawerItem text='Log Out' icon={HiOutlineLogout} onClick={() => dispatch(signOutUser())} />
                </>
              ) : (
                <AppDrawerItem text='Sign In' icon={HiOutlineLogin} onClick={() => dispatch(openAuthModal())} />
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AppDrawer;

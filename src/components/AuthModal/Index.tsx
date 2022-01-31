import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { closeAuthModal, selectAuthIsOpenModal, signInWithFacebook, signInWithGoogle, signInWithTwitter } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const AuthModal = () => {
  const isOpen = useAppSelector(selectAuthIsOpenModal);
  const dispatch = useAppDispatch();
  return (
    <Modal autoFocus={false} isOpen={isOpen} onClose={() => dispatch(closeAuthModal())} isCentered>
      <ModalOverlay />
      <ModalContent maxW='md' mx='2' rounded='sm'>
        <ModalCloseButton />
        <ModalBody p='8'>
          <Text fontSize='lg' textAlign='start'>
            Sign In
          </Text>
          <Stack direction={{ base: "column", md: "column" }} mt='12' width='full' justifyContent='space-between'>
            <Button disabled onClick={() => dispatch(signInWithTwitter())} size='lg' rounded='none' colorScheme='twitter' leftIcon={<FaTwitter />}>
              Twitter
            </Button>
            <Button onClick={() => dispatch(signInWithGoogle())} size='lg' rounded='none' colorScheme='red' leftIcon={<FaGoogle />}>
              Google
            </Button>
            <Button onClick={() => dispatch(signInWithFacebook())} size='lg' rounded='none' colorScheme='facebook' leftIcon={<FaFacebook />}>
              Facebook
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;

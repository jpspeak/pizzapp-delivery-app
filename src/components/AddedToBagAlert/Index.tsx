import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import { HiShoppingBag } from "react-icons/hi";

const AddedToBagAlert = () => {
  return (
    <>
      <Modal isOpen={true} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent bgColor='rgba(0,0,0,.8)' color='white' maxW='400px'>
          <ModalBody py='4'>
            <Flex alignItems='center' flexDirection='column'>
              <Icon as={HiShoppingBag} h='14' w='14' mt='8' />
              <Text mt='4'>Added to bag!</Text>

              <Button mt='8' w='full' colorScheme='orange'>
                ADD MORE PRODUCTS
              </Button>
              <Button mt='2' w='full' colorScheme='red'>
                PROCEED TO CHECKOUT
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddedToBagAlert;

import { Button, Flex, Icon, Modal, ModalBody, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import { HiShoppingBag } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { closeAddedToBagAlert, selectIsOpenAddedToBagAlert } from "../../features/bag/bagSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const AddedToBagAlert = () => {
  const isOpenAddedToBagAlert = useAppSelector(selectIsOpenAddedToBagAlert);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToProducts = () => {
    dispatch(closeAddedToBagAlert());
    navigate("/products");
  };

  const navigateToBag = () => {
    dispatch(closeAddedToBagAlert());
    navigate("/bag");
  };

  return (
    <>
      <Modal autoFocus={false} isOpen={isOpenAddedToBagAlert} onClose={() => dispatch(closeAddedToBagAlert())} isCentered>
        <ModalOverlay />
        <ModalContent bgColor='rgba(0,0,0,.8)' color='white' maxW='400px'>
          <ModalBody py='4'>
            <Flex alignItems='center' flexDirection='column'>
              <Icon as={HiShoppingBag} h='14' w='14' mt='8' />
              <Text mt='4' fontSize='lg'>
                Added to bag!
              </Text>

              <Button onClick={navigateToProducts} mt='8' w='full' colorScheme='orange'>
                ADD MORE PRODUCTS
              </Button>
              <Button onClick={navigateToBag} mt='2' w='full' colorScheme='red'>
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

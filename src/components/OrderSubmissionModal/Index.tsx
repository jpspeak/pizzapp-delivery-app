import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bagSubmitOrder } from "../../features/bag/bagSlice";
import { useAppDispatch } from "../../hooks";

interface FormdataType {
  fullname: string;
  contactNumber: string;
  deliveryAddress: string;
}

const OrderSubmissionModal = () => {
  // const isOpen = useAppSelector(selectAuthIsOpenModal);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState<FormdataType>({
    fullname: "",
    contactNumber: "",
    deliveryAddress: ""
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormdata(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(bagSubmitOrder(formdata)).then(() => {
      navigate("/order-history");
    });
  };
  return (
    <>
      <Button onClick={onOpen} rounded='none' colorScheme='orange' width='full'>
        PLACE ORDER
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW='md' mx='2'>
          <ModalCloseButton />
          <ModalBody p='8'>
            <Text fontWeight='bold'>CASH ON DELIVERY</Text>
            <Text fontSize='lg' mt='2'>
              You will pay $40 after the delivery.
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack alignItems='normal' spacing={4} mt='4'>
                <FormControl>
                  <FormLabel>Full name</FormLabel>
                  <Input name='fullname' onChange={handleOnChange} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Contact number</FormLabel>
                  <Input type='number' name='contactNumber' onChange={handleOnChange} required />
                </FormControl>
                <FormControl>
                  <FormLabel>Delivery address</FormLabel>
                  <Input name='deliveryAddress' onChange={handleOnChange} required />
                </FormControl>
              </VStack>
              <Button colorScheme='orange' mt='8' type='submit' w='full'>
                Submit Order
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderSubmissionModal;

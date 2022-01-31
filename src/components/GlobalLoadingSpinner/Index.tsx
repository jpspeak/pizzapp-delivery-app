import { Center, Modal, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import { selectGlobalLoadingState } from "../../features/common/selectors";
import { useAppSelector } from "../../hooks";

const GlobalLoadingSpinner = () => {
  const isLoading = useAppSelector(selectGlobalLoadingState);
  return (
    <>
      <Modal isOpen={isLoading} onClose={() => {}} size='full'>
        <ModalOverlay />
        <ModalContent bgColor='transparent'>
          <Center height='100vh'>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='orange' size='xl' />
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GlobalLoadingSpinner;

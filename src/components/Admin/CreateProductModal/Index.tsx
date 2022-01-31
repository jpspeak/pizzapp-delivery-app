import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { closeCreateProductModal, createProduct, selectCreateProductModalIsOpen } from "../../../features/admin/product/productFormModalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ProductForm, { ProductFormValuesType } from "../ProductForm/Index";

const CreateProductModal = () => {
  const isOpen = useAppSelector(selectCreateProductModalIsOpen);
  const dispatch = useAppDispatch();

  const formValues = {
    name: "",
    description: "",
    priceRegular: "",
    priceLarge: "",
    priceExtraLarge: "",
    status: "available",
    image: undefined
  };

  const handleSubmit = (values: ProductFormValuesType) => {
    dispatch(createProduct(values));
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => dispatch(closeCreateProductModal())}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Create product</ModalHeader>
          <ModalBody pb='4'>
            <ProductForm initialFormValues={formValues} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProductModal;

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { closeEditProductModal, editProduct, selectEditProductModalIsOpen, selectSelectedProduct } from "../../../features/admin/product/productFormModalSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ProductForm, { ProductFormValuesType } from "../ProductForm/Index";

const EditProductModal = () => {
  const isOpen = useAppSelector(selectEditProductModalIsOpen);
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const dispatch = useAppDispatch();

  const formValuesFallback = {
    name: selectedProduct?.name || "",
    description: selectedProduct?.description || "",
    priceRegular: selectedProduct?.prices.regular.toString() || "",
    priceLarge: selectedProduct?.prices.large.toString() || "",
    priceExtraLarge: selectedProduct?.prices.extraLarge.toString() || "",
    status: selectedProduct?.status || "available",
    image: undefined
  };

  const handleSubmit = (values: ProductFormValuesType) => {
    if (selectedProduct) {
      dispatch(editProduct({ productId: selectedProduct?.id, data: values }));
    }
    console.log(values);
  };
  if (!selectedProduct) return <></>;
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => dispatch(closeEditProductModal())}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Edit product</ModalHeader>
          <ModalBody pb='4'>
            <ProductForm initialFormValues={formValuesFallback} onSubmit={handleSubmit} editMode />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProductModal;

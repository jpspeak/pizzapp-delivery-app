import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../config/firebase";
import { RootState } from "../../../store";
import { v4 as uuidv4 } from "uuid";
import { StateType } from "../../../common/types";
import { ProductType } from "../../admin/product/productsSlice";
import { ProductFormValuesType } from "../../../components/Admin/ProductForm/Index";

interface ProductFormModalType {
  createProductModalIsOpen: boolean;
  editProductModalIsOpen: boolean;
  createProductState: StateType;
  editProductState: StateType;
  deleteProductState: StateType;
  selectedProduct?: ProductType;
}

export const createProduct = createAsyncThunk("productFormModal/createStatus", async (payload: ProductFormValuesType) => {
  const newProduct = {
    name: payload.name,
    description: payload.description,
    prices: {
      regular: parseInt(payload.priceRegular),
      large: parseInt(payload.priceLarge),
      extraLarge: parseInt(payload.priceExtraLarge)
    },
    status: payload.status
  };

  const productsColRef = collection(db, "products");
  const pathRef = ref(storage, `products/${uuidv4()}`);

  if (!payload.image) return Promise.reject("Image is required");

  await uploadBytes(pathRef, payload.image);
  const imageUrl = await getDownloadURL(pathRef);
  await addDoc(productsColRef, { ...newProduct, image: imageUrl });
});

export const editProduct = createAsyncThunk("productFormModal/editStatus", async ({ productId, data }: { productId: string; data: ProductFormValuesType }) => {
  const existingProduct = {
    name: data.name,
    description: data.description,
    prices: {
      regular: parseInt(data.priceRegular),
      large: parseInt(data.priceLarge),
      extraLarge: parseInt(data.priceExtraLarge)
    },
    status: data.status
  };

  const productDocRef = doc(db, "products", productId);
  const pathRef = ref(storage, `products/${uuidv4()}`);

  if (data.image) {
    const product = (await (await getDoc(productDocRef)).data()) as ProductType;
    const imageUrl = ref(storage, product.image);
    await deleteObject(imageUrl);
    await uploadBytes(pathRef, data.image);
    const newImageUrl = await getDownloadURL(pathRef);
    await updateDoc(productDocRef, { ...existingProduct, image: newImageUrl });
  } else {
    await updateDoc(productDocRef, { ...existingProduct });
  }
});
export const deleteProduct = createAsyncThunk("productFormModal/deleteStatus", async (product: ProductType) => {
  const productDocRef = doc(db, "products", product.id);
  await deleteDoc(productDocRef);
  const imageUrl = ref(storage, product.image);
  await deleteObject(imageUrl);
});

const initialState: ProductFormModalType = {
  createProductModalIsOpen: false,
  editProductModalIsOpen: false,
  createProductState: "READY",
  editProductState: "READY",
  deleteProductState: "READY"
};

const productFormModalSlice = createSlice({
  name: "productFormModal",
  initialState,
  reducers: {
    openCreateProductModal: state => {
      state.createProductModalIsOpen = true;
    },
    closeCreateProductModal: state => {
      state.createProductModalIsOpen = false;
    },
    openEditProductModal: (state, action: PayloadAction<ProductType>) => {
      state.editProductModalIsOpen = true;
      state.selectedProduct = action.payload;
    },
    closeEditProductModal: state => {
      state.editProductModalIsOpen = false;
    }
  },
  extraReducers: builder => {
    //Create product
    builder.addCase(createProduct.pending, (state, action) => {
      state.createProductState = "LOADING";
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.createProductState = "READY";
      state.createProductModalIsOpen = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.createProductState = "ERROR";
      state.createProductModalIsOpen = false;
      console.log(action.error);
    });
    //Update product
    builder.addCase(editProduct.pending, (state, action) => {
      state.editProductState = "LOADING";
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.editProductState = "READY";
      state.editProductModalIsOpen = false;
    });
    builder.addCase(editProduct.rejected, (state, action) => {
      state.editProductState = "ERROR";
      state.editProductModalIsOpen = false;
      console.log(action.error);
    });
    //Delete product
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.deleteProductState = "LOADING";
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductState = "READY";
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.deleteProductState = "ERROR";
      console.log(action.error);
    });
  }
});

export const selectCreateProductModalIsOpen = (state: RootState) => state.admin.productFormModal.createProductModalIsOpen;
export const selectEditProductModalIsOpen = (state: RootState) => state.admin.productFormModal.editProductModalIsOpen;
export const selectCreateProductState = (state: RootState) => state.admin.productFormModal.createProductState;
export const selectEditProductState = (state: RootState) => state.admin.productFormModal.editProductState;
export const selectSelectedProduct = (state: RootState) => state.admin.productFormModal.selectedProduct;

export const { openCreateProductModal, closeCreateProductModal, openEditProductModal, closeEditProductModal } = productFormModalSlice.actions;

export default productFormModalSlice.reducer;

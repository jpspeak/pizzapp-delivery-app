import { RootState } from "../../store";

//Global loading selector
export const selectGlobalLoadingState = (state: RootState) => {
  return (
    state.bag.submitOrderState === "LOADING" ||
    state.products.productsFetchState === "LOADING" ||
    state.admin.orders.updateStatusState === "LOADING" ||
    state.admin.productFormModal.createProductState === "LOADING" ||
    state.admin.productFormModal.editProductState === "LOADING"
  );
};

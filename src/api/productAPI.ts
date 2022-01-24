import http from "./http";

class ProductsAPI {
  getAll() {
    return http.get("/products");
  }
  getOne(productId: number) {
    return http.get(`/products/${productId}`);
  }
}

export const productAPI = new ProductsAPI();

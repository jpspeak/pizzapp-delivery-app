import { Route, Routes } from "react-router-dom";
import Header from "../components/Header/Index";
import PageNotFound from "../components/PageNotFound/Index";
import Bag from "./Bag";
import Home from "./Home";
import OrderHistory from "./OrderHistory";
import Product from "./Product";
import Products from "./Products";

const EndUserPage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/bag' element={<Bag />} />
        <Route path='/order-history' element={<OrderHistory />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default EndUserPage;

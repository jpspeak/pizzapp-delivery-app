import { Route, Routes } from "react-router-dom";
import Header from "../../components/Admin/Header/Index";
import PageNotFound from "../../components/PageNotFound/Index";

import Orders from "./Orders";
import Products from "./Products";

const AdminPage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/products' element={<Products />} />
        <Route index element={<Orders />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AdminPage;

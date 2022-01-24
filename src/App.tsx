import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Index";
import Header from "./components/Header/Index";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Products from "./pages/Products";
import MyOrder from "./pages/MyOrder";
import Product from "./pages/Product";
import Bag from "./pages/Bag";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/my-order' element={<MyOrder />} />
        <Route path='/products/:productId' element={<Product />} />
        <Route path='/bag' element={<Bag />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

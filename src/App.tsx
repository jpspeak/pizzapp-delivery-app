import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import AuthModal from "./components/AuthModal/Index";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import GlobalLoadingSpinner from "./components/GlobalLoadingSpinner/Index";
import { Flex, Spacer } from "@chakra-ui/react";
import EndUserPage from "./pages/Index";
import AdminPage from "./pages/admin/Index";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(setUser({ id: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL }));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);
  return (
    <>
      <Flex alignItems='normal' direction='column' minH='100vh'>
        <Routes>
          <Route path='/*' element={<EndUserPage />} />
          <Route path='/admin/*' element={<AdminPage />} />
        </Routes>
        <Spacer />
        <Footer />
      </Flex>
      <AuthModal />
      <GlobalLoadingSpinner />
    </>
  );
}

export default App;

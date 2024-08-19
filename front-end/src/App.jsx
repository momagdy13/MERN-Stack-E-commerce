import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Them";
import Navbar from "./Components/Navbar/Navbar";
import Fotter from "./Components/Fotter/Fotter";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Favourite from "./Pages/Favourite";
import Profile from "./Pages/Profile";
import ERR from "./Components/ERR/ERR";
import Signup from "./Pages/SignUp/Signup";
import Product from "./Components/ProductDetails/ProductDetails";
import Result from "./Components/Result/Result";
import Protected from "./Protected";
import EmailVerificationTemplate from "./Components/NonVerify/NonVerify";
import PaymentSuccessPage from "./Components/PaymentSuccess/PaymentSuccess";
import Order from "./Pages/Order";

function App() {
  const [theme, colorMode] = useMode();
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const location = useLocation();

  const hideNavAndFooterRoutes = ["/login", "/signup", "/login/verify"];
  const shouldHideNavAndFooter = hideNavAndFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {!shouldHideNavAndFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/fav" element={<Favourite />} />
          <Route path="/product-details" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<Protected />}>
            <Route path="/login" element={<Signup />} />
            <Route path="/:token" element={<Shop />} />
          </Route>
          <Route
            path="/login/verify/:userId/:uniqueString"
            element={<Signup />}
          />
          <Route path="/success" element={<PaymentSuccessPage />} />
          <Route
            path="/:nanverify/nan"
            element={<EmailVerificationTemplate />}
            match={({ match }) => {
              const { token } = match.params;
              return uuidPattern.test(token) ? (
                <EmailVerificationTemplate />
              ) : (
                <Navigate to="/404" />
              );
            }}
          />
          <Route path="/result/:catg" element={<Result />} />
          <Route path="/404" element={<ERR />} />
        </Routes>
        {!shouldHideNavAndFooter && <Fotter />}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

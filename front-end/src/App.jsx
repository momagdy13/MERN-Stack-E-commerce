import Navbar from "./Components/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Them";
import Fotter from "./Components/Fotter/Fotter";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import { Route, Routes, Navigate } from "react-router-dom";
import Favourite from "./Pages/Favourite";
import Profile from "./Pages/Profile";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import ERR from "./Components/ERR/ERR";
import Signup from "./Pages/Signup";
import Product from "./Components/ProductDetails/Product";
import Result from "./Components/Result/Result";
import Protected from "./Protected";
import EmailVerificationTemplate from "./Components/NonVerify/NonVerify";

function App() {
  const [theme, colorMode] = useMode();
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/fav" element={<Favourite />} />
          <Route path="/product-details" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/:hash/suc"
            element={<CheckoutSuccess />}
            match={({ match }) => {
              const { token } = match.params;
              return uuidPattern.test(token) ? (
                <CheckoutSuccess />
              ) : (
                <Navigate to="/404" />
              );
            }}
          />
          <Route element={<Protected />}>
            <Route path="/login" element={<Signup />} />
            <Route path="/:token" element={<Shop />} />{" "}
          </Route>
          <Route
            path="/login/verify/:userId/:uniqueString"
            element={<Signup />}
          />
          <Route path="/" element={<Shop />} />
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
          <Route path="/result" element={<Result />} />
          <Route path="/*" element={<ERR />} />
        </Routes>
        <Fotter />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

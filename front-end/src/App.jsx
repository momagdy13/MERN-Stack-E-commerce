import Navbar from "./Components/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Them";
import Fotter from "./Components/Fotter/Fotter";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import { Route, Routes } from "react-router-dom";
import Favourite from "./Pages/Favourite";
import Profile from "./Pages/Profile";
import CheckoutSuccess from "./Pages/CheckoutSuccess";
import ERR from "./Components/ERR/ERR";
import Signup from "./Pages/Signup";
import Product from "./Components/ProductDetails/Product";
import Result from "./Components/Result/Result";
import Protected from "./Protected";

function App() {
  const [theme, colorMode] = useMode();
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
          <Route path="/success" element={<CheckoutSuccess />} />
          <Route element={<Protected />}>
            <Route path="/login" element={<Signup />} />
            <Route
              path="/login/verify/:token/:userId/:uniqueString"
              element={<Signup />}
            />{" "}
            <Route path="/:token" element={<Shop />} />{" "}
          </Route>
          <Route path="/" element={<Shop />} />
          <Route path="/result" element={<Result />} />
          <Route path="/*" element={<ERR />} />
        </Routes>
        <Fotter />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

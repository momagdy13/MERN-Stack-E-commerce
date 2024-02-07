import Navbar from "./Components/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Them";
import Fotter from "./Components/Fotter/Fotter";
import Cart from "./Pages/Cart";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Headers/Header";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
         <Navbar />
         <Header />
         <Routes>
           <Route path="/" element={<Shop />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/logIn" element={<Login />} />
         </Routes>
         <Fotter />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

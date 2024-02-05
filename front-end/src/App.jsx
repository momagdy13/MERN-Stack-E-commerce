import Navbar from "./Components/Navbar/Navbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Them";
import Header from "./Components/Headers/Header";
import Header2 from "./Components/Headers/Header-";
import Hero from "./Components/Hero/Hero";
import IconSection from "./Components/IconSection/IconSection";
import ShopCategory from "./Components/ShopCategory/ShopCategory";
import Fotter from "./Components/Fotter/Fotter";
import ScrollToTop from "./Components/Scroll/Scroll";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Header />
        <Header2 />
        <ScrollToTop />
        <Hero />
        <IconSection />
        <ShopCategory />
        <Fotter />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

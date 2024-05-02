import React from "react";
import Header from "../Components/Headers/Header";
import Hero from "../Components/Hero/Hero";
import IconSection from "../Components/IconSection/IconSection";
import ShopCatg from "../Components/ShopCatg/ShopCatg";
import ScrollToTop from "../Components/Scroll/Scroll";


export default function Shop() {
  return (
    <div>
      <Header />
      <Hero />
      <IconSection />
      <ShopCatg />
      <ScrollToTop />
    </div>
  );
}

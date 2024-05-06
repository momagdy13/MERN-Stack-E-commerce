import React, { useEffect } from "react";
import Header from "../Components/Headers/Header";
import Hero from "../Components/Hero/Hero";
import IconSection from "../Components/IconSection/IconSection";
import ShopCatg from "../Components/ShopCatg/ShopCatg";
import ScrollToTop from "../Components/Scroll/Scroll";
import { useParams } from "react-router-dom";

export default function Shop() {
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      console.log("Token:", token);
      localStorage.setItem("token", token);
    }
  }, [token]);
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

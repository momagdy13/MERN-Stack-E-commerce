import React, { useEffect } from "react";
import Header from "../Components/Navbar/Header";
import Hero from "../Components/Hero/Hero";
import ShopCatg from "../Components/Home/AllCatgeory";
import ScrollToTop from "../Components/Scroll/Scroll";
import { useParams } from "react-router-dom";
import CategoryIcon from "../Components/Home/CategoryIcon";

export default function Shop() {
  const { token } = useParams();
  useEffect(() => {
    if (token) {
      console.log("Token:", token);
      localStorage.setItem("token", token);
      window.location.reload();
    }
  }, [token]);
  return (
    <div>
      <Hero />
      <CategoryIcon/>
      <ShopCatg />
      <ScrollToTop />
    </div>
  );
}

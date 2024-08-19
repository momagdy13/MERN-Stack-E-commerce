import React from "react";
import { Carousel } from "react-bootstrap";
import banner1 from "../Assest/Apparel_1500x400._CB567879664_.png";
import banner2 from "../Assest/Jewellery_1500x400._CB567883703_.png";
import banner3 from "../Assest/Shoes_1500x400._CB567883703_ (1).png";

export default function Hero() {
  return (
    <Carousel style={{ marginTop: "30px" }}>
      <Carousel.Item interval={1000}>
        <img src={banner1} style={{ width: "100%" }} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img src={banner2} style={{ width: "100%" }} alt="" />
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img src={banner3} style={{ width: "100%" }} alt="" />
      </Carousel.Item>
    </Carousel>
  );
}

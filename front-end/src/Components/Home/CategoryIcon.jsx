import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import fastion from "../Assest/dress.png";
import food from "../Assest/food.png";
import elect from "../Assest/electronic.png";
import shoses from "../Assest/Shoes.png";
import watch from "../Assest/watch.png";

export default function CategoryIcon() {
  return (
    <>
      <h2 style={{ margin: "40px 66px" }}>Featured Categories</h2>
      <div className="home-icon">
        <Link to={"/result/fastion"} style={{ color: "inherit" }}>
          <div className="box-effect-hover">
            <img
              src={fastion}
              style={{ width: "8vw", height: "13vh", marginBottom: "9px" }}
            />
            <h6>Fastion</h6>
          </div>
        </Link>
        <Link to={"/result/gerocery"} style={{ color: "inherit" }}>
          <div className="box-effect-hover">
            <img
              src={food}
              style={{ width: "8vw", height: "13vh", marginBottom: "9px" }}
            />
            <h6>Gerocery</h6>
          </div>
        </Link>
        <Link to={"/result/electronic"} style={{ color: "inherit" }}>
          <div className="box-effect-hover">
            <img
              src={elect}
              style={{ width: "8vw", height: "13vh", marginBottom: "9px" }}
            />
            <h6>Electronic</h6>
          </div>
        </Link>
        <Link to={"/result/shoes"} style={{ color: "inherit" }}>
          <div className="box-effect-hover">
            <img
              src={shoses}
              style={{ width: "8vw", height: "13vh", marginBottom: "9px" }}
            />
            <h6>Shoes</h6>
          </div>
        </Link>
        <Link to={"/result/watch"} style={{ color: "inherit" }}>
          <div className="box-effect-hover">
            <img
              src={watch}
              style={{ width: "8vw", height: "13vh", marginBottom: "9px" }}
            />
            <h6>Watch</h6>
          </div>
        </Link>
      </div>
    </>
  );
}

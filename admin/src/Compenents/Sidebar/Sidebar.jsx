import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product from "../../assets/Product_Cart.svg";
import list_product from "../../assets/Product_list_icon.svg";
import Typography from "@mui/material";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item-add">
          <img src={add_product} alt="" />
          <Typography>Add Product</Typography>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product} alt="" />
          <Typography>Product List</Typography>
        </div>
      </Link>
    </div>
  );
}

import React from "react";
import "./Admin.css";
import Sidebar from "../../Compenents/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Compenents/AddProduct/AddProduct";
import ListProduct from "../../Compenents/ListProduct/ListProduct";
export default function Admin() {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct />}></Route>

        <Route path="/listproduct" element={<ListProduct />}></Route>
      </Routes>
    </div>
  );
}
